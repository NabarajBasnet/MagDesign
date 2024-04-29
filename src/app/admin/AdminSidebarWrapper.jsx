'use client'

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { AdminSidebarState } from "@/components/redux/action";
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
