import express from 'express';
import mysql from 'mysql2';
import session from 'express-session';
import bcrypt from 'bcrypt';
import cors from 'cors';
const app=express();
const port=3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:"example-secret-key",
    resave:false,
    saveUninitialized:true
}));
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST'],
    credentials:true
}));
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_project'
});
db.connect(err=>{
   if(err){
    console.log('database connection failed'+err);
   }
   else{
    console.log('Database connection success');
   }
});
app.get('/packageInfo',(req,res)=>{
    db.query('SELECT * FROM recommendations',(err,data)=>{
        if(err){
            console.log('Data retrievel issues'+err);
            res.status(500).json({error:'Data retrievel problem'});
        }
        else{
            res.status(200).json(data);
        }
    })
});
app.get('/PackagesDetail',(req,res)=>{
    db.query('SELECT * FROM package_details',(err,data)=>{
        if(err){
            console.log('Data retrievel issues'+err);
            res.status(500).json({error:'Data retrievel problem'});
        }
        else{
            res.status(200).json(data);
        }
    })
});
app.get('/activeUsers', (req, res) => {
    const query = `
        SELECT 
            DATE_FORMAT(last_login_date, '%Y-%m') AS month,
            COUNT(*) AS active_user_count
        FROM 
            userlogin
        WHERE 
            last_login_date > DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY 
            month
        ORDER BY 
            month DESC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('An error occurred while fetching data.');
            return;
        }
        res.status(200).json(results);
    });
});
app.get('/inactiveUsers', (req, res) => {
    const query = `
        SELECT 
            DATE_FORMAT(last_login_date, '%Y-%m') AS month,
            COUNT(*) AS inactive_user_count
        FROM 
            userlogin
        WHERE 
            last_login_date <= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY 
            month
        ORDER BY 
            month DESC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('An error occurred while fetching data.');
            return;
        }
        res.status(200).json(results);
    });
});
app.post('/userBookedPackages',(req,res)=>{
    const {email}=req.body;
    const query='SELECT * from booking_details where email=?';
    db.query(query,[email],(err,result)=>{
        if(err){
            res.status(500).send({message:'Error'});
        }
        else{
            res.status(200).json(result);
        }
    })
})
app.post('/adminLogin', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM userlogin WHERE email = ? AND role = "admin"';
    
    db.query(query, [email], (err, results) => {
        if (err) {
            console.log('Error occurred! Try again later: ' + err);
            res.status(500).send("Problem occurred");
        } else if (results.length > 0) {
            const storedHashedPassword = results[0].password;

            // Compare the provided password with the hashed password
            bcrypt.compare(password, storedHashedPassword, (err, result) => {
                if (err) {
                    res.status(500).send('Error occurred during password comparison');
                } else if (result) {
                    const updateQuery = 'UPDATE userlogin SET last_login_date = NOW() WHERE id = ?';
                    db.query(updateQuery, [results[0].id], (updateErr, updateResults) => {
                        if (updateErr) {
                            console.log('Error updating last login date: ' + updateErr);
                        }
                    });

                    req.session.user = email;
                    res.status(200).send({success: true, message: "Login Success"});
                } else {
                    res.status(401).send({message: 'Invalid email or password'});
                }
            });
        } else {
            res.status(401).send({message: 'Invalid email or password'});
        }
    });
});
app.post('/userLogin', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM userlogin WHERE email = ? AND role = "user"';
    
    db.query(query, [email], (err, results) => {
        if (err) {
            console.log('Error occurred! Try again later: ' + err);
            res.status(500).send("Problem occurred");
        } else if (results.length > 0) {
            const storedHashedPassword = results[0].password;
            bcrypt.compare(password, storedHashedPassword, (err, result) => {
                if (err) {
                    res.status(500).send('Error occurred during password comparison');
                } else if (result) {
                    const updateQuery = 'UPDATE userlogin SET last_login_date = NOW() WHERE id = ?';
                    db.query(updateQuery, [results[0].id], (updateErr, updateResults) => {
                        if (updateErr) {
                            console.log('Error updating last login date: ' + updateErr);
                        }
                    });

                    req.session.user = {
                        email: results[0].email,
                        id: results[0].id,
                        name: results[0].Full_Name
                    };
                    res.status(200).send({ success: true, message: "Login Success", user: req.session.user });
                } else {
                    res.status(401).send({ message: 'Invalid email or password' });
                }
            });
        } else {
            res.status(401).send({ message: 'Invalid email or password' });
        }
    });
});



app.get('/api/auth/me',(req,res)=>{
    if(req.session.user){
    return res.status(200).json(req.session.user);
    }
    res.status(401).json({message:'Not Logged In'});
})
app.post('/recommendAdd',(req,res)=>{
    const {Title,Description,Price,Tag,Slug,ImageUrl }=req.body;
    const query='INSERT INTO recommendations(title,des,price,tag,imageUrl,slug) Values(?,?,?,?,?,?)';
    db.query(query,[Title,Description,Price,Tag,ImageUrl,Slug],(err,result)=>{
        if(err){
            res.status(500).send({message:"Data insertion Failed"});
        }
        else{
            res.status(200).send({message:"Data insertion success"});
        }
    })
})
app.post('/booking-form',(req,res)=>{
    const{transactionId,Full_Name,
        Email,
        Country,
        Phone_number,
        Address,
        Postal_Code,
        Package_Name,
        Start_Date,
        Num_People,Price}=req.body;
        const query='INSERT INTO booking_details(Full_Name,Email,Country,Phone_Number,Address,Postal_Code,Package_Name,Start_Date,Num_People,price,Transaction_id) Values(?,?,?,?,?,?,?,?,?,?,?)';
        db.query(query,[Full_Name,Email,Country,Phone_number,Address,Postal_Code,Package_Name,Start_Date,Num_People,parseInt(Price),transactionId],(err,data)=>{
            if(err){
                res.status(500).send({message:"Booking failed"});
            }
            else{
                res.status(200).send({message:"Success"});
            }
        })
});
app.get('/bookingDetails',(req,res)=>{
    const query='SELECT * FROM booking_details';
    db.query(query,(err,result)=>{
        if(err){
            res.status(500).send({message:"fetching failed"});
        }
        else{
            res.status(200).json(result);
        }
    });
})
app.post('/recommendDelete',(req,res)=>{
    const {id} =req.body;
    const query = 'DELETE FROM recommendations WHERE pid = ?';
    console.log(`Recieved id: ${id}`);
    db.query(query,[parseInt(id)],(err)=>{
        if(err){
            res.status(500).send({message:"Data Deletion Failed"});
        }
        else{
            res.status(200).send({message:"Data Deletion Success"});
        }
    })
})
app.post('/recommendUpdate',(req,res)=>{
    const {id,Title,Description,Price,Tag,Slug,ImageUrl}=req.body;
    const query='UPDATE recommendations SET title=?,des=?,price=?,tag=?,imageUrl=?,slug=? WHERE pid=?';
    db.query(query,[Title,Description,Price,Tag,ImageUrl,Slug,id],(err,result)=>{
        if(err){
            res.status(500).send({message:"Data insertion Failed"});
        }
        else{
            res.status(200).send({message:"Data insertion success"});
        }
    })
});
app.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            res.status(500).send({message:"Error occur while logout"});
        }
        else{
            res.status(200).send({message:"Log out Success"});
        }
    })
});
app.get('/totaluser',(req,res)=>{
    const query='SELECT COUNT(*) As total FROM userlogin where role="user"';
    db.query(query,(err,result)=>{
        if(err){
            res.status(500).send({message:"Error"});
        }
        else{
            res.status(200).json(result);
        }
    })
})

function isAuthenticated(req,res,next){
    if(req.session.user){
        next();
    }
    else{
        res.redirect('/login');
    }
};
app.get('/package/:slug', (req, res) => {
    const { slug } = req.params;
    const sql = 'SELECT * FROM package_details WHERE slug = ?';
    db.query(sql, [slug], (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Package not found' });
        return;
      }
      res.json(results[0]);
    });
  });
app.post('/addPackageDetails',(req,res)=>{
   const{slug,p_title,content_one,content_two,content_three,content_four,itinerary,p_imageUrl}=req.body;
   const query='INSERT INTO package_details(slug,p_title,content_one,content_two,content_three,content_four,itinerary,p_imageUrl) Values(?,?,?,?,?,?,?,?)';
   db.query(query,[slug,p_title,content_one,content_two,content_three,content_four,itinerary,p_imageUrl],(err,results)=>{
    if(err){
        
        res.status(500).send({message:'Server error'});
    }
    else{
        res.status(200).send({message:'Success'});
    }
   });
});
app.get('/package_details',(req,res)=>{
    const query='SELECT * FROM package_details';
    db.query(query,(err,results)=>{
        if(err){
            res.status(500).send({message:'Server Error'});
        }
        else{
            res.status(200).json(results);
        }
    })
})
app.post('/updatePackageDetails', (req, res) => {
    const { slug, p_title, content_one, content_two, content_three, content_four, itinerary, p_imageUrl } = req.body;
    const query = 'UPDATE package_details SET p_title=?, content_one=?, content_two=?, content_three=?, content_four=?, itinerary=?, p_imageUrl=? WHERE slug=?';
    db.query(query, [p_title, content_one, content_two, content_three, content_four, itinerary, p_imageUrl, slug], (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Update Error' });
        } else {
            res.status(200).send({ message: "Update Success" });
        }
    });
});
app.post('/SignUp', (req, res) => {
    const { fullName, address, phoneNumber, email, password } = req.body;
    const saltRounds = 10; 

    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send({ message: 'Error hashing password' });
        }

        const query = 'INSERT INTO userlogin (Full_Name, email, password, address, Phone_number) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [fullName, email, hashedPassword, address, phoneNumber], (err, result) => {
            if (err) {
                res.status(500).send({ message: 'Insertion Error' });
            } else {
                res.status(200).send({ message: 'Insertion done' });
            }
        });
    });
});
app.post('/addUserInfo', (req, res) => {
    const { full_name, email, password, address, phone_number, role } = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send({ message: 'Error hashing password' });
        }
        const query = 'INSERT INTO userlogin (Full_Name, email, password, address, Phone_number, role) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [full_name, email, hashedPassword, address, phone_number, role], (err, result) => {
            if (err) {
                res.status(500).send({ message: 'Insertion Error' });
            } else {
                res.status(200).send({ message: 'Insertion done' });
            }
        });
    });
});
app.get('/userInfo',(req,res)=>{
    const query='SELECT * FROM userlogin';
    db.query(query,(err,data)=>{
        if(err){
            res.status(500).send({message:'Error while data retrieval'});
        }
        else{
            res.status(200).json(data);
        }
    })
})
app.post('/deletePackageDetails',(req,res)=>{
    const{ slug }=req.body;
    const query='DELETE FROM package_details WHERE slug=?';
    console.log(`recieved slug:${slug}`);
    db.query(query,[slug],(err,data)=>{
        if(err){
            res.status(500).send({message:"Failed"});
        }
        else{
            res.status(200).send({message:"Done!!"});
        }
    });
})
app.post('/deleteUserInfo',(req,res)=>{
    const {id}=req.body;
    const query='DELETE FROM userlogin WHERE id=?';
    db.query(query,[parseInt(id)],(err,result)=>{
        if(err){
            res.status(500).send({message:"Failed to delete"});
        }
        else{
            res.status(200).send({message:"Success"});
        }
    })
})
app.post('/updateUserInfo',(req,res)=>{
    const {full_name,
        email,
        password,
        address,
        phone_number,
        role,id}=req.body;
    const query='Update userlogin SET Full_Name=?,email=?,password=?,address=?,Phone_number=?,role=? WHERE id=?';
    db.query(query,[full_name,email,password,address,phone_number,role,parseInt(id)],(err,result)=>{
        if(err){
            res.status(500).send({message:'Error occured'});
        }
        else{
            res.status(200).send({message:"Success"});
        }
    })

});
app.post('/bookingDelete',(req,res)=>{
    const {booking_id}=req.body;
    const query='DELETE FROM booking_details where booking_id=?';
    db.query(query,[parseInt(booking_id)],(err,result)=>{
        if(err){
            res.status(500).send({message:"Deletion Failed"});
        }
        else{
            res.status(200).send({message:'Success'});
        }
    })
})
app.get('/totalAdmin',(req,res)=>{
    const query='SELECT COUNT(*) as totalAdmin From userlogin where role="Admin"';
    db.query(query,(err,result)=>{
        if(err){
            res.status(500).send({message:'Error'});
        }else{
            res.status(200).json(result);
        }
    })
})
app.get('/totalBookings',(req,res)=>{
    const query='SELECT COUNT(*) as totalBookings From booking_details';
    db.query(query,(err,result)=>{
        if(err){
            res.status(500).send({message:'Error'});
        }else{
            res.status(200).json(result);
        }
    })
})
app.get('/totalEarnings',(req,res)=>{
    const query='SELECT SUM(price) AS totalEarnings FROM booking_details';
    db.query(query,(err,result)=>{
        if(err){
            res.status(500).send({message:'Error'});
        }else{
            res.status(200).json(result);
        }
    })
})
app.post('/updateBooking',(req,res)=>{
        
    const {First_Name,
        Last_Name,
        Email,
        Country,
        Phone_Number,
        Address,
        Postal_Code,
        Package_Name,
        Start_Date,
        Num_People,
        id
    }=req.body;
    const query='UPDATE booking_details SET First_Name=?,Last_Name=?,Email=?,Country=?,Phone_Number=?,Address=?,Postal_Code=?,Package_Name=?,Start_Date=?,Num_People=? where booking_id=?';
    db.query(query,[First_Name,
        Last_Name,
        Email,
        Country,
        Phone_Number,
        Address,
        parseInt(Postal_Code),
        Package_Name,
        Start_Date,
        parseInt(Num_People),
        parseInt(id)],(err,result)=>{
            if(err){
                res.status(500).send({message:'Error occured'});
            }
            else{
                res.status(200).send({message:"Success"});
            }
        })

});



app.get('/search', (req, res) => {
    const query = req.query.query;
    const price = req.query.price;

    // Ensure the query is a valid word (at least two characters)
    if (!/^\w{2,}$/.test(query.trim())) {
        return res.status(400).json({ error: 'Invalid search term. Please enter at least two characters.' });
    }

    // Search for full words only using REGEXP
    let sql = `SELECT slug, p_title, price, content_one, content_two, content_three, content_four, itinerary, p_imageUrl 
               FROM package_details 
               WHERE p_title REGEXP ? 
               OR content_one REGEXP ? 
               OR content_two REGEXP ? 
               OR content_three REGEXP ? 
               OR content_four REGEXP ? 
               OR itinerary REGEXP ?`;

    const regexQuery = `\\b${query}\\b`; // Matches full words only
    const params = [regexQuery, regexQuery, regexQuery, regexQuery, regexQuery, regexQuery];

    if (price) {
        sql += ` AND price <= ?`;
        params.push(price);
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});
  
app.get('/admin', isAuthenticated, (req, res) => {
    res.send(`Welcome to the admin page, ${req.session.user}!`);
});
app.listen(port,()=>{
    console.log(`Server is listening at port:${port}`);
});
