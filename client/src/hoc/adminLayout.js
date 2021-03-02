import React from 'react';

const AdminLayout = (props) => {
    return(
    <div className="container admin_layout">
        <>
            {props.children}
        </>
    </div>
)}

export default AdminLayout;