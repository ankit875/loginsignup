import React from 'react';
import { Link } from 'react-router-dom'
const Dashboard = () => (
    <div style={{ textAlign: 'Center' }}>
        <h1 >You have Successfully logged in</h1>
        <Link  to='/signin'>Go Back</Link>
    </div>
)

export default Dashboard;