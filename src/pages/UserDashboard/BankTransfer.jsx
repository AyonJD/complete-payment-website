import React, { useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Breadcrumb from '../../partials/BreadCrumb/BreadCrumb';
import Footer from '../../partials/Footer';
import BankTransferForm from '../../partials/Forms/UserForms/BankTransferForm';

const BankTransfer = () => {
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
                            <div className=' flex items-center'>
                                <div className="flex flex-wrap">
                                    <Breadcrumb title="Bank Transfer" />
                                    <div className="w-full px-4 mt-2">
                                        <BankTransferForm title="Bank Transfer" />
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

export default BankTransfer;