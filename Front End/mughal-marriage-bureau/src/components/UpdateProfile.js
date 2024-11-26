import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
function UpdateProfile(){
    const [view, setView] = useState('Edit'); 

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
    const { id } = useParams(); // Get the post ID from the route parameters
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/profile',{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                const user = response.data;
                setForm({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                    contact: user.contact,
                    city: user.city,
                    image: null,
                    disability: user.disability,
                    address: user.address,
                    income: user.income,
                    caste: user.caste,
                    age: user.age,
                    height: user.height,
                    education: user.education,
                    religion: user.religion,
                    maritalStatus: user.maritalStatus,
                    fatherName: user.fatherName,
                    motherName: user.motherName,
                    siblings: user.siblings,
                    marriedSiblings: user.marriedSiblings,
                    divorcedSiblings: user.divorcedSiblings,
                    parentsAlive: user.parentsAlive,
                    familyDisabilities: user.familyDisabilities,
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, [id]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach(key => {
            formData.append(key, form[key]);
        });
try {
       axios.put('http://localhost:8080/api/profile', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                credentials: 'include'
            })
            alert("Updated Successfully")
            setView('Myprofile')
} catch (error) {
    
}
          
    };
    return(
        <form onSubmit={handleSubmit} className="w-full max-w-lg p-4 border border-gray-300 shadow-md mx-auto bg-white rounded">
                   
        <h2 className="text-xl font-bold text-center mb-4">Update Your Profile</h2>
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

         <button type="submit" className="w-full mt-4 bg-green-500 text-white p-2 rounded">Update Profile</button>
     </form>
         
    )
}
export default UpdateProfile;