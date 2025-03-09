import { useState, useEffect } from 'react';
import axios from "axios";

const Recommendations = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        Title: '',
        Description: '',
        Price: '',
        Tag: '',
        Slug: '',
        ImageUrl: ''
    });
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(isUpdate ? 'http://localhost:3000/recommendUpdate' : 'http://localhost:3000/recommendAdd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(isUpdate ? { ...formData, id: updateId } : formData)
            });
            if (response.ok) {
                console.log('Data send successfully');
                window.location.reload();
            } else {
                console.log('Data sending failed');
            }
        } catch (error) {
            console.log("Error Occured:" + error);
        }
    };

    const handleDelete = async (id) => {
        let confirmation = confirm('Are you sure you want to Delete?');
        if (confirmation) {
            try {
                const response = await fetch('http://localhost:3000/recommendDelete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: parseInt(id) })
                });
                const data = response.text();
                console.log(data);
                if (response.ok) {
                    alert('Data Deletion Success');
                    window.location.reload();
                } else {
                    console.log('Problem sending Id');
                }
            } catch (error) {
                console.log('Id sent Error:' + error);
            }
        }
    };

    const handleUpdate = (item) => {
        setFormData({
            Title: item.title,
            Description: item.des,
            Price: item.price,
            Tag: item.tag,
            Slug: item.slug,
            ImageUrl: item.imageUrl
        });
        setIsUpdate(true);
        setUpdateId(item.pid);
    };

    useEffect(() => {
        axios.get('http://localhost:3000/packageInfo')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log("Error Occured:" + error);
            })
    }, []);

    return (
        <>
            <div className="flex font-roboto flex-col">

                <div className="w-full mx-auto p-6 bg-gray-100">
                    <div className="bg-white shadow-xl rounded-lg p-7">
                        <p className="text-4xl font-semibold">{isUpdate ? 'Update Recommendations' : 'Add Recommendations'}</p>
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="Title" className="block text-lg">Title:</label>
                                <input type="text" id="title" name="Title" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.Title} onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="Description" className="block text-lg">Description:</label>
                                <textarea id="description" className="w-full px-4 py-2 border border-gray-300 rounded-md" rows="4" name="Description" value={formData.Description} onChange={handleChange} required></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="Price" className="block text-lg">Price:</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" name="Price" value={formData.Price} onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="Tag" className="block text-lg">Tag:</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" name="Tag" value={formData.Tag} onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="Slug" className="block text-lg">Slug:</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" name="Slug" value={formData.Slug} onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="ImageUrl" className="block text-lg">ImageUrl:</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" name="ImageUrl" value={formData.ImageUrl} onChange={handleChange} required />
                            </div>
                            <input type="submit" value={isUpdate ? 'Update Package' : 'Add Package'} className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 cursor-pointer" />
                        </form>
                    </div>
                </div>

                <div className="w-full px-6 py-5 bg-white shadow-lg mt-10">
                    <p className="text-4xl font-semibold mb-4">List of Recommendations</p>
                    <table className="min-w-full border-2 border-gray-200">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-6">Pid</th>
                                <th className="py-3 px-6">Title</th>
                                <th className="py-3 px-6">Description</th>
                                <th className="py-3 px-6">Price</th>
                                <th className="py-3 px-6">Tag</th>
                                <th className="py-3 px-6">ImageUrl</th>
                                <th className="py-3 px-6">Slug</th>
                                <th className="py-3 px-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((item) => (
                                <tr key={item.pid} className="hover:bg-gray-100">
                                    <td className="py-3 px-6 border">{item.pid}</td>
                                    <td className="py-3 px-6 border">{item.title}</td>
                                    <td className="py-3 px-6 border">{item.des}</td>
                                    <td className="py-3 px-6 border">{item.price}</td>
                                    <td className="py-3 px-6 border">{item.tag}</td>
                                    <td className="py-3 px-6 border">{item.imageUrl}</td>
                                    <td className="py-3 px-6 border">{item.slug}</td>
                                    <td className="py-4 px-8 border">
                                        <button className="bg-blue-500 px-4 py-2 text-white rounded-md font-bold mr-2" onClick={() => handleUpdate(item)}>Update</button>
                                        <button className="bg-red-500 px-4 py-2 text-white rounded-md mt-2" onClick={() => handleDelete(item.pid)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}

export default Recommendations;
