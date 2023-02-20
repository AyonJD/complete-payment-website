import React from 'react';
import OtpInput from "otp-input-react";


// Icon Import
import { ImCross } from 'react-icons/im';
import { BsFillShieldLockFill } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";
import { loadStorage } from '../../utils/localStorage';

const OtpVerifyPopup = ({ setOpenOtpPopup, otp, setOtp, onOTPVerify, loading }) => {
    
    const user = loadStorage('payment_user');

    return (
        <div className='popup_wrapper'>
            <div className="popup_content relative">
                <ImCross onClick={() => setOpenOtpPopup(false)} className='absolute right-0 top-0 mr-4 mt-4 h-4 w-4 cursor-pointer' />
                <div>
                    <>
                        <div className="bg-white text_bkash rounded-full mb-3 flex items-center py-2 justify-center">
                            <BsFillShieldLockFill size={30} />
                            <label
                                htmlFor="otp"
                                className="font-bold text-xl text-bkash inline-block ml-2"
                            >
                                Enter your OTP
                            </label>
                        </div>

                        <div className="otp_wrapper">
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                OTPLength={6}
                                otpType="number"
                                disabled={false}
                                autoFocus
                                className="opt_container"
                            ></OtpInput>
                        </div>
                        <button
                            onClick={onOTPVerify}
                            className="bg_bkash w-full flex gap-1 items-center justify-center py-2 mt-5 text-white rounded"
                        >
                            {loading && (
                                <ImSpinner9 size={15} className=" animate-spin" />
                            )}
                            <span>Verify OTP</span>
                        </button>
                    </>
                </div>
            </div>
        </div>
    );
};

export default OtpVerifyPopup;