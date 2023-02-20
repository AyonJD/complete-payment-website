import React, { useEffect, useState } from 'react';
import Footer from '../../partials/Footer';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import UserList from '../../partials/Table/AdminTable/UserList';
import { loadStorage } from '../../utils/localStorage';

const AllUser = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentUser = loadStorage('payment_user');
	
	useEffect(() => { 
		if (currentUser.role !== 'admin') {
           window.location.replace('/');
            return;
        }
	}, []);

    return (
        <div className="flex overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <div className="height_handle">
                    <main className='height_handle mt-7'>
                        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">

                            <UserList />
                        </div>
                    </main>
                    <Footer />
                </div>

            </div>
        </div>
    );
};

export default AllUser;