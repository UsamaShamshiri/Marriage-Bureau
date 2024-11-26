import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from './Logout';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import { FaEllipsisV } from 'react-icons/fa'; 
import UpdateProfile from './UpdateProfile';
const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        contact: '',
        city: '',
        image: null,
        disability: '',
        address: '',
        income: '',
        caste: '',
        age: '',
        height: '',
        education: '',
        religion: '',
        maritalStatus: '',
        fatherName: '',
        motherName: '',
        siblings: '',
        marriedSiblings: '',
        divorcedSiblings: '',
        parentsAlive: '',
        familyDisabilities: '',
    });
    const [view, setView] = useState('Myprofile'); 
    const [error, setError] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        // Fetch profile data
        axios.get('http://localhost:8080/api/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => {
                setProfile(response.data);
                setLoading(false);

                // Fetch profile image separately
                if (response.data.imageId) {
                    fetchImage(response.data.imageId);
                }
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
                setError("New User!!! Let's create your profile to find your soulmate.");
            });
    }, []);

    const fetchImage = (imageId) => {
        axios.get(`http://localhost:8080/api/files/${imageId}`, {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                const imageUrl = URL.createObjectURL(response.data);
                setProfileImage(imageUrl); // Set the image in state
            })
            .catch(err => {
                console.error('Error fetching image', err);
            });
    };

    const downloadPDF = () => {
        const element = document.getElementById('profile-content'); // Profile section container
        html2canvas(element, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * pageWidth) / canvas.width;

            // Add the image to the PDF
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            // If content exceeds page height, handle multi-page
            if (imgHeight > pageHeight) {
                const pages = Math.ceil(imgHeight / pageHeight);
                for (let i = 1; i < pages; i++) {
                    pdf.addPage();
                    pdf.addImage(
                        imgData,
                        'PNG',
                        0,
                        -(pageHeight * i),
                        imgWidth,
                        imgHeight
                    );
                }
            }

            pdf.save('profile.pdf');
        });
    };

    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const handleSubmit = (e) => {
                e.preventDefault();
                const formData = new FormData();
                Object.keys(form).forEach(key => {
                    formData.append(key, form[key]);
                });
                axios.post('http://localhost:8080/api/profile', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    credentials: 'include'
                })
                    .then(response => {
                        setProfile(response.data);
                        setError(null);
        
                        // Fetch the updated image after profile submission
                        if (response.data.imageId) {
                            fetchImage(response.data.imageId);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        setError('Failed to upload profile.');
                    });
            };
        

    if (loading) return <p>Loading...</p>;

    return (
        
        <div className="flex flex-col h-screen bg-gray-100">
              <header className="w-full bg-green-800 text-white p-4 flex items-center justify-between sticky top-0">
                    <h1 className="text-xl font-bold">User Profile</h1>
                    <button onClick={toggleSidebar} className="text-2xl lg:hidden">
                        <FaEllipsisV />
                    </button>
                </header>
            {/* Sidebar */}
            <div className='flex flex-1'>
            <aside className={`bg-green-900 text-white w-64  p-6 space-y-6 fixed lg:relative transform transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-64'} lg:translate-x-0`}>
                <h2 className="text-2xl font-semibold">User Menu</h2>
                <nav>
                <ul className="space-y-4">
                            <li className={`cursor-pointer ${view === 'Myprofile' ? 'bg-green-700 p-2 rounded-lg' : ''}`} onClick={() => setView('Myprofile')}>
                                My Profile
                            </li>
                            <li className={`cursor-pointer ${view === 'Edit' ? 'bg-green-700 p-2 rounded-lg' : ''}`} onClick={() => setView('Edit')}>
                                Edit Profile
                            </li>
                            
                            <li><Logout /></li>
                        </ul>
                </nav>
            </aside>

            <div className="flex-1 ml-0 lg:ml-24 transition-all duration-300 ease-in-out p-4">
              

            { view==='Myprofile'&&  ( <div className="container mx-auto p-4">
                    {profile ? (
                        <>
                            <div id='profile-content' className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="p-8 flex gap-8">
                                    <div className="flex justify-center items-center">
                                        {profileImage ? (
                                            <img
                                                src={profileImage}
                                                alt="Profile"
                                                className="w-32 h-32 rounded-full border-4"
                                            />
                                        ) : (
                                            <p>Loading profile picture...</p>
                                        )}
                                    </div>
                                    <div className="text-center mt-6">
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            {profile.firstName} {profile.lastName}
                                        </h2>
                                        <p className="text-gray-600 mt-2">
                                            <strong>City:</strong> {profile.city}
                                        </p>
                                        <p className="text-gray-600 mt-2">
                                            <strong>Contact:</strong> {profile.contact}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-100 px-6 py-4">
                                    <h3 className="text-lg font-bold text-gray-800">Personal Details</h3>
                                    <div className="mt-4 grid grid-cols-2 gap-4 text-gray-700">
                                        <div><strong>Age:</strong> {profile.age}</div>
                                        <div><strong>Height:</strong> {profile.height}</div>
                                        <div><strong>Caste:</strong> {profile.caste}</div>
                                        <div><strong>Religion:</strong> {profile.religion}</div>
                                        <div><strong>Education:</strong> {profile.education}</div>
                                        <div><strong>Business/Occupation:</strong> {profile.income}</div>
                                        <div><strong>Disability:</strong> {profile.disability || 'None'}</div>
                                        <div><strong>Marital Status:</strong> {profile.maritalStatus}</div>
                                    </div>
                                </div>
                                <div className="bg-white px-6 py-4">
                                    <h3 className="text-lg font-bold text-gray-800">Family Details</h3>
                                    <div className="mt-4 grid grid-cols-2 gap-4 text-gray-700">
                                        <div><strong>Father's Name:</strong> {profile.fatherName}</div>
                                        <div><strong>Mother's Name:</strong> {profile.motherName}</div>
                                        <div><strong>Siblings:</strong> {profile.siblings}</div>
                                        <div><strong>Married Siblings:</strong> {profile.marriedSiblings}</div>
                                        <div><strong>Divorced Siblings:</strong> {profile.divorcedSiblings}</div>
                                        <div><strong>Parents Alive:</strong> {profile.parentsAlive}</div>
                                        <div><strong>Family Disabilities:</strong> {profile.familyDisabilities || 'None'}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center py-4">
                                <button
                                    onClick={downloadPDF}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-300"
                                >
                                    Download as PDF
                                </button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className="w-full max-w-lg p-4 border border-gray-300 shadow-md mx-auto bg-white rounded">
                   
                   <h2 className="text-xl font-bold text-center mb-4">Create Your Profile</h2>
                     <h3 className="font-bold">Personal Details</h3>

                   <div className="grid grid-cols-2 gap-4">
                         <div>
                           <label className="block text-gray-700">First Name</label>
                           <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={form.firstName}
                                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={form.lastName}
                                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Gender</label>
                            <input
                                type="text"
                                name="gender"
                                placeholder="Gender"
                                value={form.gender}
                                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Contact</label>
                            <input
                                type="text"
                                name="contact"
                                placeholder="Contact Number"
                                value={form.contact}
                                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">City</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={form.city}
                                onChange={(e) => setForm({ ...form, city: e.target.value })}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Disability</label>
                            <input
                                type="text"
                                name="disability"
                                placeholder="Disability (if any)"
                                value={form.disability}
                                onChange={(e) => setForm({ ...form, disability: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Business/Occupation</label>
                            <input
                                type="text"
                                name="Business/Occupation"
                                placeholder="Business/Occupation"
                                value={form.income}
                                onChange={(e) => setForm({ ...form, income: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Caste</label>
                            <input
                                type="text"
                                name="caste"
                                placeholder="Caste"
                                value={form.caste}
                                onChange={(e) => setForm({ ...form, caste: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Age</label>
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={form.age}
                                onChange={(e) => setForm({ ...form, age: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Height</label>
                            <input
                                type="text"
                                name="height"
                                placeholder="Height"
                                value={form.height}
                                onChange={(e) => setForm({ ...form, height: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Education</label>
                            <input
                                type="text"
                                name="education"
                                placeholder="Education"
                                value={form.education}
                                onChange={(e) => setForm({ ...form, education: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Religion</label>
                            <select
                                name="religion"
                                value={form.religion}
                                onChange={(e) => setForm({ ...form, religion: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select Religion</option>
                                <option value="Hindu">Hindu</option>
                                <option value="Muslim">Muslim</option>
                                <option value="Christian">Christian</option>
                                <option value="Sikh">Sikh</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Marital Status</label>
                            <select
                                name="maritalStatus"
                                value={form.maritalStatus}
                                onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            >
                                <option value="">Select Marital Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                            </select>
                        </div>
                        <label className="block text-gray-700 mt-4">Profile Picture</label>
                        <input
                            type="file"
                            name="image"
                            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                            required
                            className="w-full p-2"
                        />
                    </div>
                    <div className="mt-4">
                        <h3 className="font-bold">Family Details</h3>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                                <label className="block text-gray-700">Father's Name</label>
                                <input
                                    type="text"
                                    name="fatherName"
                                    placeholder="Father's Name"
                                    value={form.fatherName}
                                    onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Mother's Name</label>
                                <input
                                    type="text"
                                    name="motherName"
                                    placeholder="Mother's Name"
                                    value={form.motherName}
                                    onChange={(e) => setForm({ ...form, motherName: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Number of Siblings</label>
                                <input
                                    type="number"
                                    name="siblings"
                                    placeholder="Number of Siblings"
                                    value={form.siblings}
                                    onChange={(e) => setForm({ ...form, siblings: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Married Siblings</label>
                                <input
                                    type="number"
                                    name="marriedSiblings"
                                    placeholder="Number of Married Siblings"
                                    value={form.marriedSiblings}
                                    onChange={(e) => setForm({ ...form, marriedSiblings: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Divorced Siblings</label>
                                <input
                                    type="number"
                                    name="divorcedSiblings"
                                    placeholder="Number of Divorced Siblings"
                                    value={form.divorcedSiblings}
                                    onChange={(e) => setForm({ ...form, divorcedSiblings: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Parents Alive?</label>
                                <select
                                    name="parentsAlive"
                                    value={form.parentsAlive}
                                    onChange={(e) => setForm({ ...form, parentsAlive: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                >
                                    <option value="">Select</option>
                                    <option value="Both">Both</option>
                                    <option value="Father">Father</option>
                                    <option value="Mother">Mother</option>
                                    <option value="None">None</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700">Family Disabilities</label>
                                <input
                                    type="text"
                                    name="familyDisabilities"
                                    placeholder="Disabilities in Family (if any)"
                                    value={form.familyDisabilities}
                                    onChange={(e) => setForm({ ...form, familyDisabilities: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full mt-4 bg-green-500 text-white p-2 rounded">Save Profile</button>
                </form>
                    
                    )}
                </div>)}
                {view==='Edit'&&(<UpdateProfile/>)}
            </div>
            </div>
        </div>
    );
};

export default UserProfile;
