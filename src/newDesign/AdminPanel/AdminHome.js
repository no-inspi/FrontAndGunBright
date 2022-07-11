import { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import AdminStatsG from './AdminStatsG';

const AdminHome = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const el = document.querySelector(".loader-container");
        if (el) {
            el.remove();
            setLoading(!loading);
        }
        else {
            setLoading(false);
        }
    }, [])
    if (loading) {
        return null;
    }
    return (
        <div style={{backgroundColor: '#f3f4f3'}}> 
            <AdminNav />  
            <AdminStatsG />  
        </div>
    )
}

export default AdminHome;