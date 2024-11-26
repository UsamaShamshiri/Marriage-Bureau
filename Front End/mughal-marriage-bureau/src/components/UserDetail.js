// UserDetail.js
import React from 'react';

const UserDetail = ({ user, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center  z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg h-full overflow-scroll  ">
               <div id='profile-content' className="max-w-3xl  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                 <div className="p-8 flex  gap-12">
                     <div className="flex justify-center items-center">
                         {user.imageUrl ? (
                             <img
                                 src={user.imageUrl}
                                 alt="Profile"
                                 className="w-32 h-32 rounded-full border-4 "
                             />
                         ) : (
                             <p>Loading profile picture...</p>
                         )}
                     </div>
                     <div className="text-center mt-6">
                         <h2 className="text-2xl font-bold text-gray-800">
                             {user.firstName} {user.lastName}
                         </h2>
                         <p className="text-gray-600 mt-2">
                             <strong>City:</strong> {user.city}
                         </p>
                         <p className="text-gray-600 mt-2">
                             <strong>Contact:</strong> {user.contact}
                         </p>
                        
                     </div>
                 </div>
                 <div className="bg-gray-100 px-6 py-4">
                     <h3 className="text-lg font-bold text-gray-800">Personal Details</h3>
                     <div className="mt-4 grid grid-cols-2 gap-4 text-gray-700">
                         <div><strong>Age:</strong> {user.age}</div>
                         <div><strong>Height:</strong> {user.height}</div>
                         <div><strong>Caste:</strong> {user.caste}</div>
                         <div><strong>Religion:</strong> {user.religion}</div>
                         <div><strong>Education:</strong> {user.education}</div>
                         <div><strong>Business/Occupation:</strong> {user.income}</div>
                         <div><strong>Disability:</strong> {user.disability || 'None'}</div>
                         <div><strong>Marital Status:</strong> {user.maritalStatus}</div>
                     </div>
                 </div>
                 <div className="bg-white px-6 py-4">
                     <h3 className="text-lg font-bold text-gray-800">Family Details</h3>
                     <div className="mt-4 grid grid-cols-2 gap-4 text-gray-700">
                         <div><strong>Father's Name:</strong> {user.fatherName}</div>
                         <div><strong>Mother's Name:</strong> {user.motherName}</div>
                         <div><strong>Siblings:</strong> {user.siblings}</div>
                         <div><strong>Married Siblings:</strong> {user.marriedSiblings}</div>
                         <div><strong>Divorced Siblings:</strong> {user.divorcedSiblings}</div>
                         <div><strong>Parents Alive:</strong> {user.parentsAlive}</div>
                         <div><strong>Family Disabilities:</strong> {user.familyDisabilities || 'None'}</div>
                     </div>
                 </div>
                
             </div>
                <button onClick={onClose} className="mt-4 bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-4 rounded-lg">
                    Close
                </button>
            </div>
        </div>
    );
};

export default UserDetail;
