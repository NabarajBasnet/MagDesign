'use client'

import { useSelector, useDispatch } from "react-redux";
import { AdminSidebarState } from "@/components/redux/action";
import Link from "next/link";


const AdminHeader = () => {
    const adminSidebar = useSelector(state => state.adminSidebar);
    const dispatch = useDispatch();


    const dispatchAdminSidebarState = () => {
        dispatch(AdminSidebarState(!adminSidebar))
    }

    return (
        <section className="mx-auto">
            <div className="w-full bg-blue-700">
                <div className="flex items-center justify-between p-4 w-full text-white font-bold">
                    <div className="flex items-center w-6/12">
                        {adminSidebar ? (
                            <img onClick={dispatchAdminSidebarState} src="/icons/close-button.png" className="bg-white rounded-full hover:scale-105 transition-all cursor-pointer w-7" />

                        ) : (
                            <img onClick={dispatchAdminSidebarState} src="/icons/menu.png" className="cursor-pointer w-7 bg-white rounded-full hover:scale-105 transition-all" />
                        )}
                        <Link href={'/'} className="ml-16">
                            <h1>Home</h1>
                        </Link>
                    </div>

                    <div>
                        <h1>Nabaraj</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminHeader;