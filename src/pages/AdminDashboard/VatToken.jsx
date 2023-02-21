
import React, { useEffect, useState } from 'react';
import { ImCross, ImSpinner9 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import Footer from '../../partials/Footer';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import { createVatToken, getVatToken } from '../../utils/dbFuncs';

const VatToken = () => {
    const [vatToken, setVatToken] = React.useState('');
    const navigate = useNavigate();
    const [vatLoading, setVatLoading] = React.useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [tokenFromDb, setTokenFromDb] = useState('');

    useEffect(() => {
        const _retriveData = async () => {
            const _vatToken = await getVatToken();
            setTokenFromDb(_vatToken);
        }
        _retriveData();
    }, [])

    const createToken = async () => {
        setVatLoading(true);
        await createVatToken(vatToken);
        setVatLoading(false);
        setVatToken('');
        window.location.reload();
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
                        <div className="px-4 sm:px-6 lg:px-8 w-full md:w-1/2 max-w-9xl mx-auto">
                            <div className="w-full mx-auto px-4 pt-5">
                            <label
                                        className="block text_bkash text-md font-bold mb-4 "
                                        htmlFor="grid-password"
                                    >
                                        CURRENT VAT TOKEN : {tokenFromDb}
                                    </label>
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Update Vat Token
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
                                        className="bg_bkash text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 flex"
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
                    </main>
                    <Footer />
                </div>

            </div>
        </div>

    );
};

export default VatToken;