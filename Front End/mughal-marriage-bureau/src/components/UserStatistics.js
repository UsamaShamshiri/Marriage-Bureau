import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserStatistics = () => {
    const [statistics, setStatistics] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/admin/statistics', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then(response => {
            setStatistics(response.data);
        })
        .catch(err => {
            console.error(err);
            setError('Error fetching user statistics');
        });
    }, []);

    if (error) return <div>{error}</div>;
    if (!statistics) return <div>Loading statistics...</div>;

    return (
        <div className="p-4 border rounded shadow-lg">
        <h2 className="text-xl font-bold">User Statistics</h2>
        <p>Total Users: {statistics.totalUsers}</p>
        <p>Users Created in Last 30 Days: {statistics.usersCreatedLast30Days}</p>
    </div>
    );
};

export default UserStatistics;
