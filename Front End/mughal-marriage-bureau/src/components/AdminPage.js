
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEllipsisV } from 'react-icons/fa'; 
import Logout from './Logout';
import UserStatistics from './UserStatistics';
import UserDetail from './UserDetail'; 
import { Link } from 'react-router-dom';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageUrls, setImageUrls] = useState({});
    const [showSidebar, setShowSidebar] = useState(false); 
    const [view, setView] = useState('profiles'); 
    const [selectedUser, setSelectedUser] = useState(null); 
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
       if(searchQuery.length===0){
        fetchUsers()

       }
    }, [searchQuery]);
    const search = async()=>{
        try {
            const response = await axios.get(`http://localhost:8080/api/admin/users/search/${searchQuery}`,{
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
            })
            console.log(response.data)
            setUsers(response.data);
        } catch (error) {
            console.log(error)
        }
    }
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/admin/users', {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
               
            });
            setUsers(response.data);
            response.data.forEach(user => {
                if (user.imageId) {
                    fetchImage(user.imageId, user.id);
                }
            });
        } catch (err) {
            console.error(err);
            setError("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    const fetchImage = async (imageId, userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/admin/users/${imageId}`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
                responseType: 'blob'
            });
            const imageUrl = URL.createObjectURL(response.data);
            setImageUrls(prevState => ({ ...prevState, [userId]: imageUrl }));
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/users/${id}`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            });
            fetchUsers();
        } catch (err) {
            console.error(err);
            setError("Failed to delete user.");
        }
    };

    const handleUserClick = (user) => {
        const userWithImage = { ...user, imageUrl: imageUrls[user.id] };
        setSelectedUser(userWithImage);
    };

    const toggleSidebar = () => setShowSidebar(!showSidebar);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col h-screen bg-gray-100">
           
            <header className="w-full bg-green-800 text-white p-4 flex items-center justify-between sticky top-0">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <button onClick={toggleSidebar} className="text-2xl lg:hidden">
                    <FaEllipsisV />
                </button>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className={`bg-green-900 text-white w-64 p-6 space-y-6 fixed lg:relative transform transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-64'} lg:translate-x-0`}>
                    <h2 className="text-2xl font-semibold">Admin Menu</h2>
                    <nav>
                        <ul className="space-y-4">
                            <li className={`cursor-pointer ${view === 'profiles' ? 'bg-green-700 p-2 rounded-lg' : ''}`} onClick={() => setView('profiles')}>
                                All Profiles
                            </li>
                            <li className={`cursor-pointer ${view === 'statistics' ? 'bg-green-700 p-2 rounded-lg' : ''}`} onClick={() => setView('statistics')}>
                                Statistics
                            </li>
                            <li className="p-2 rounded-lg">
                                <Link to="/signup">Add Users</Link>
                            </li>
                            <li><Logout /></li>
                        </ul>
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-6 lg:ml-24 transition-all duration-300 ease-in-out overflow-y-auto">
                    {view === 'profiles' && (
                        <div className="overflow-x-auto shadow-md rounded-lg ">
                            {/* Search Input */}
                            <div className='flex gap-2'>
                            <input
                                type="text"
                                placeholder="Search by name, contact, city..."
                                value={searchQuery}
                                onChange={(e)=>{setSearchQuery(e.target.value)}}
                                className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
                            />
                           
                            <button onClick={search} className='bg-green-800 text-white p-2 mb-4 rounded'>Search</button>
                            </div>
                            <table className="min-w-full bg-white">
                                <thead className="bg-green-800 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left">Picture</th>
                                        <th className="px-6 py-4 text-left">Name</th>
                                        <th className="px-6 py-4 text-left">Contact</th>
                                        <th className="px-6 py-4 text-left">City</th>
                                        <th className="px-6 py-4 text-left">Created At</th>
                                        <th className="px-6 py-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-50">
                                    {users.map(user => (
                                        <tr key={user.id} className="border-b cursor-pointer hover:bg-gray-100" onClick={() => handleUserClick(user)}>
                                            <td className="px-6 py-4 text-center">
                                                <img src={imageUrls[user.id]} alt="User" className="rounded-full border-2 border-gray-300 w-12 h-12" />
                                            </td>
                                            <td className="px-6 py-4 text-center font-medium text-gray-700">{user.firstName} {user.lastName}</td>
                                            <td className="px-6 py-4 text-center">{user.contact}</td>
                                            <td className="px-6 py-4 text-center">{user.city}</td>
                                            <td className="px-6 py-4 text-center">{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button onClick={(e) => { e.stopPropagation(); handleDelete(user.id); }} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-lg">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {selectedUser && <UserDetail user={selectedUser} onClose={() => setSelectedUser(null)} />}
                    {view === 'statistics' && <UserStatistics />}
                </main>
            </div>
        </div>
    );
};

export default UserManagement;
