'use client'

import { useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar";


const AdminSidebarWrapper = () => {

    const adminSidebar = useSelector(state => state.adminSidebar)
    return (
        <>
            <div>

                <div>
                    {adminSidebar ?
                        (
                            <AdminSidebar />
                        )
                        :
                        (
                            ''
                        )}
                </div>

            </div>
        </>
    )
}


export default AdminSidebarWrapper;
