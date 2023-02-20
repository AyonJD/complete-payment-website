import React, { useState } from 'react';
import Breadcrumb from '../../partials/BreadCrumb/BreadCrumb';
import ProfileCard from '../../partials/Cards/UserCard/ProfileCard';
import Footer from '../../partials/Footer';
import DepositForm from '../../partials/Forms/UserForms/DepositForm';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';

const Deposit = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <div className="height_handle main_bg">
                    <main className='height_handle'>
                        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">

                            <div className='bg-bkash height_handle'>
                                <div className="pt-1 pb-2">
                                    <Breadcrumb title="Deposit" />
                                </div>
                                <div className="flex flex-wrap items-center">
                                    <div className="w-full lg:w-8/12 px-4">
                                        <DepositForm title="Deposit" />
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <ProfileCard />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <Footer />
                </div>


            </div>
        </div>
    );
};

export default Deposit;