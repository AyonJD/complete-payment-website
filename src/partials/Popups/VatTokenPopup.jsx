import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Icon Import
import { ImCross } from 'react-icons/im';
import { getVatToken } from '../../utils/dbFuncs';
import { loadStorage } from '../../utils/localStorage';
import OtpVerifyPopup from './OtpVerifyPopup';

const VatTokenPopup = ({ onSignIn, setOpenVatTokenPopup, setOpenOtpPopup }) => {
    const [vatToken, setVatToken] = React.useState('');
    const [constantToken, setConstantToken] = React.useState('');
    const [vatLoading, setVatLoading] = React.useState(false);

    const user = loadStorage('payment_user');

    useEffect(() => {
        const _retriveData = async () => {
            const _vatToken = await getVatToken();
            setConstantToken(_vatToken);
        }
        _retriveData();
    }, []);

    const onVatTokenVerify = () => {
        setVatLoading(true);
        if (!vatToken) {
            toast.error('Please enter vat token');
            setVatLoading(false);
            return;
        }

        if (constantToken !== vatToken) {
            toast.error('Invalid vat token');
            setVatLoading(false);
            return;
        }
        onSignIn();
        setOpenVatTokenPopup(false);
        setOpenOtpPopup(true);
        setVatLoading(false)
    }

    return (
        <>
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
                                />

                                {/* <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.accountNo?.message}</small> */}
                            </div>
                        </div>

                        <div className="w-full px-4">
                            <div className="relative w-full mb-3">
                                <button
                                    className="bg_bkash text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex"
                                    type="submit"
                                    onClick={onVatTokenVerify}
                                >
                                    {vatLoading && (
                                        <ImSpinner9 size={15} className=" animate-spin" />
                                    )}
                                    <span>Submit</span>
                                </button>
                            </div>
                        </div>
        </>
    );
};

export default VatTokenPopup;