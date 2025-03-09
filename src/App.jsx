import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Admin from './components/admin/Admin';
import PrivateRoute from './components/PrivateRoute';
import PackageDetail from './components/PackageDetail';
import AllPackage from './components/Allpackage';
import Search from './components/Search';
import SignUp from './components/SignUp';
import BookingForm from './components/BookingForm';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import UserProfile from './components/UserProfile';


const initialOptions={
    clientId:'AW6FSWyoaCQm1tOxmL_VUycl12XxBFxxNyDlq_Gbl7xE1QNu-uc0AAMlBc80_CeBhysMwONU1djb_cjo',
    currency:'USD',
    intent:'capture'
}
const App = () => {
    return (
        <PayPalScriptProvider options={initialOptions}>
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path='/SignUp' element={<SignUp />}/>
                <Route path="/admin/*" element={<PrivateRoute component={Admin} />} />
                <Route path='/Search' element={<Search />}/>
                <Route path='/AllPackage' element={<AllPackage />}/>
                <Route path="*" element={<Navigate to="/login" />} />
                <Route exact path='/package/:slug' element={<PackageDetail  /> }/>
                <Route  path='/BookingForm' element={<BookingForm />}></Route>
                <Route path='/userProfile' element={<UserProfile />}></Route>
            </Routes>
        </Router>
        </PayPalScriptProvider>
    );
};

export default App;
