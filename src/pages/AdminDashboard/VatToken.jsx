
import React, { useState } from 'react';
import { ImCross, ImSpinner9 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import Footer from '../../partials/Footer';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import { createVatToken } from '../../utils/dbFuncs';

const VatToken = () => {
    const [vatToken, setVatToken] = React.useState('');
    const navigate = useNavigate();
    const [vatLoading, setVatLoading] = React.useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const createToken = async () => {
        setVatLoading(true);
        await createVatToken(vatToken);
        setVatLoading(false);
        setVatToken('');
    };

    return (
        <div className="flex overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <div className="height_handle main_bg">
                    <main className='height_handle'>
                        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">

                            <div className='popup_wrapper'>
                                <div className="popup_content relative">
                                    <ImCross onClick={() => navigate('/admin/create-user')} className='absolute right-0 top-0 mr-4 mt-4 h-4 w-4 cursor-pointer' />
                                    <div>
                                        <div className="w-full  px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Vat Token
                                                </label>
                                                <input
                                                    type="text"
                                                    className="customInputClass border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder='Enter Vat Token'
                                                    onChange={(e) => setVatToken(e.target.value)}
                                                    value={vatToken}
                                                />

                                                {/* <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.accountNo?.message}</small> */}
                                            </div>
                                        </div>

                                        <div className="w-full px-4">
                                            <div className="relative w-full mb-3">
                                                <button
                                                    className="bg_bkash text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex"
                                                    type="submit"
                                                    onClick={createToken}
                                                >
                                                    {vatLoading && (
                                                        <ImSpinner9 size={15} className=" animate-spin" />
                                                    )}
                                                    <span>Submit</span>
                                                </button>
                                            </div>
                                        </div>
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

export default VatToken;