import { useState, useEffect } from 'react';
import axios from 'axios';

const PackageDetail = () => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        slug: '',
        p_title: '',
        content_one: '',
        content_two: '',
        content_three: '',
        content_four: '',
        itinerary: '',
        p_imageUrl: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch(isUpdate?'http://localhost:3000/updatePackageDetails':'http://localhost:3000/addPackageDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(isUpdate?{...formData}:formData)
            });
            if (response.ok) {
                console.log('Success');
                alert('Data Added successfully');
                window.location.reload();
            } else {
                console.log('Unsuccess');
                alert('Data not added');
            }
        } catch (error) {
            console.log('Error occurred: ' + error);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3000/package_details') 
            .then(response => {
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error('Expected data to be an array:', response.data);
                }
            })
            .catch(error => {
                console.error('Data Fetch error:', error); 
            });
    }, []); 

    //limit the words
    const limitWords = (str, num) => {
        return str.split(" ").slice(0, num).join(" ") + (str.split(" ").length > num ? "..." : "");
    };

    const handleUpdate = (item) => {
        setFormData({
        slug: item.slug,
        p_title:item.p_title,
        content_one:item.content_one,
        content_two:item.content_two,
        content_three:item.content_three,
        content_four:item.content_four,
        itinerary:item.itinerary,
        p_imageUrl:item.p_imageUrl
        });
        setIsUpdate(true);
        
    };

    const handleDelete = async(slug) => {
        const confirmation=confirm('Are you sure you want to delete?');
        if(confirmation){
            try{
            const response=await fetch('http://localhost:3000/deletePackageDetails',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({slug:slug})
            });
            if(response.ok){
                alert('Deletion success');
                window.location.reload();
            }
            else{
                alert('Deletion not success');
            }}
            catch(err){
                console.log("error"+err);
            }
        }
    };

    return (
        <>
            <div className="flex font-roboto flex-col">
                <div className="w-full mx-auto p-6 bg-gray-100">
                    <div className="bg-white shadow-xl rounded-lg p-7">
                        <p className="text-4xl font-semibold">{isUpdate?'Update Package':'Add package'}</p>
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="slug" className="block text-lg">Slug:</label>
                                <input type="text" id="slug" name="slug" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.slug} onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="p_title" className="block text-lg">Title:</label>
                                <input type="text" id="p_title" name="p_title" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.p_title} onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="content_one" className="block text-lg">Content One:</label>
                                <textarea id="content_one" className="w-full px-4 py-2 border border-gray-300 rounded-md" rows="4" name="content_one" value={formData.content_one} onChange={handleChange} required></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="content_two" className="block text-lg">Content Two:</label>
                                <textarea id="content_two" className="w-full px-4 py-2 border border-gray-300 rounded-md" rows="4" name="content_two" value={formData.content_two} onChange={handleChange} required></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="content_three" className="block text-lg">Content Three:</label>
                                <textarea id="content_three" className="w-full px-4 py-2 border border-gray-300 rounded-md" rows="4" name="content_three" value={formData.content_three} onChange={handleChange} required></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="content_four" className="block text-lg">Content Four:</label>
                                <textarea id="content_four" className="w-full px-4 py-2 border border-gray-300 rounded-md" rows="4" name="content_four" value={formData.content_four} onChange={handleChange} required></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="itinerary" className="block text-lg">Itinerary:</label>
                                <textarea id="itinerary" className="w-full px-4 py-2 border border-gray-300 rounded-md" rows="4" name="itinerary" value={formData.itinerary} onChange={handleChange} required></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="p_imageUrl" className="block text-lg">ImageUrl:</label>
                                <input type="text" id="p_imageUrl" name="p_imageUrl" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.p_imageUrl} onChange={handleChange} required />
                            </div>
                            <input type="submit" value={isUpdate?'Update Package':'Add Package'} className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 cursor-pointer" />
                        </form>
                    </div>
                </div>
                <div className="max-w-full px-2 py-4 bg-white shadow-lg mt-10 overflow-x-auto">
                    <p className="text-4xl font-semibold mb-4">Package Details</p>
                    <table className="w-3/4 border-2 border-gray-200">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-1 px-2">slug</th>
                                <th className="py-1 px-2">title</th>
                                <th className="py-1 px-2">content_one</th>
                                <th className="py-1 px-2">content_two</th>
                                <th className="py-1 px-2">content_three</th>
                                <th className="py-1 px-2">content_four</th>
                                <th className="py-1 px-2">itinerary</th>
                                <th className="py-1 px-2">imageUrl</th>
                                <th className="py-1 px-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Array.isArray(data) ? (
                                data.map((item) => (
                                    <tr key={item.slug} className="hover:bg-gray-100">
                                        <td className="py-3 px-6 border">{item.slug}</td>
                                        <td className="py-3 px-6 border">{item.p_title}</td>
                                        <td className="py-3 px-6 border">{limitWords(item.content_one, 10)}</td>
                                        <td className="py-3 px-6 border">{limitWords(item.content_two, 10)}</td>
                                        <td className="py-3 px-6 border">{limitWords(item.content_three, 10)}</td>
                                        <td className="py-3 px-6 border">{limitWords(item.content_four, 10)}</td>
                                        <td className="py-3 px-6 border">{limitWords(item.itinerary, 10)}</td>
                                        <td className='py-2 px-3 border'>{item.p_imageUrl}</td>
                                        <td className="py-4 px-8 border">
                                            <button className="bg-blue-500 px-4 py-2 text-white rounded-md font-bold mr-2" onClick={() => handleUpdate(item)}>Update</button>
                                            <button className="bg-red-500 px-4 py-2 text-white rounded-md mt-2" onClick={() => handleDelete(item.slug)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="py-3 px-6 border" colSpan="8">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PackageDetail;