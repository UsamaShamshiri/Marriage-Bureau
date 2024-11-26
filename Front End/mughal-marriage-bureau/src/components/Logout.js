import React from "react";
const Logout = () => {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login'; // Redirect to login
    };

    return (
        <>
            <button onClick={handleLogout} className="text-white mx-2 p-2 bg-green-600 rounded-lg">Logout</button>


        </>
    )
}
export default Logout;