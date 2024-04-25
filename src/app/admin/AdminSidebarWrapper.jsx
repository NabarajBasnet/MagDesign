'use client'

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { AdminSidebarState } from "@/components/redux/action";
import AdminSidebar from "./AdminSidebar";


const AdminSidebarWrapper = () => {

    const adminSidebar = useSelector(state => state.adminSidebar)
    console.log('Admin SIdebar: ', adminSidebar)
    return (
        <>
            <div>
                {adminSidebar ? (
                    <>
                        <div>
                            <AdminSidebar />
                        </div>
                    </>
                ) : (
                    ''
                )}
            </div>
        </>
    )
}


export default AdminSidebarWrapper;
