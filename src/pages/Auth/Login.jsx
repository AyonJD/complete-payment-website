import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "otp-input-react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-hot-toast";

// Icons import
import { BsFillShieldLockFill } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";
import { auth } from "../../Config/firebase.config";
import { saveStorage } from "../../utils/localStorage";
import { getUserByPhone } from "../../utils/dbFuncs";
import { useForm } from "react-hook-form";


const Login = () => {
    const { register, formState: { errors }, handleSubmit, trigger, reset } = useForm();
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    // Captcha verifier
    const onCaptchVerify = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        onSignIn();
                    },
                    "expired-callback": () => { },
                },
                auth
            );
        }
    }

    // SignIn Handler
    const onSignIn = async (data) => {
        const userFromDB = await getUserByPhone("+" + phone);
        if (!userFromDB) return toast.error("User not found!");
        if (userFromDB?.data?.password !== data.password) return toast.error("Password not matched!");
        setUser(userFromDB.data);
        
        setLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;

        const formatPhone = "+" + phone;

        if (!phone) {
            toast.error("Please enter your phone number!");
            setLoading(false);
            return;
        }

        signInWithPhoneNumber(auth, formatPhone, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success("OTP sended successfully!");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    // OTP verifier
    const onOTPVerify = () => {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                saveStorage("payment_user", {...user, token: res._tokenResponse.idToken});
                setLoading(false);
                toast.success("OTP verified successfully!")

                if (user.role === "admin") {
                    return navigate("/admin/create-user");
                } else {
                    navigate("/");
                }
                
            })
            .catch((err) => {
                toast.error('Wrong OTP!')
                console.log(err)
                setLoading(false);
            });
    };

    return (
        <div className="bg_bkash h-[100vh]">
            <div className="container mx-auto px-1 sm:px-4">
                <div className="flex content-center items-center justify-center h-[100vh]">
                    <div className="w-full lg:w-5/12 sm:px-4 otp_width">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 bg-white">
                            <div id="recaptcha-container"></div>
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center">
                                    <h6 className="text-gray-600 text-md font-bold">
                                        Sign In
                                    </h6>
                                </div>

                            </div>
                            <div className="flex justify-center items-center flex-col lg:ml-[6px] px-4 lg:px-10 py-10 pt-0">

                                {
                                    showOTP ? (
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
                                    ) : (
                                        <>
                                                <form onSubmit={handleSubmit(onSignIn)} className="w-[90%]">
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Phone
                                                    </label>
                                                    <PhoneInput inputStyle={
                                                        { width: "100%", height: "45px" }
                                                    }
                                                        inputClass="customInputClass"
                                                        country={"bd"} value={phone} onChange={setPhone} />
                                                </div>

                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="customInputClass border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        placeholder="Password"
                                                    
                                                        {...register("password", {
                                                            required: 'Password is required',
                                                            minLength: {
                                                                value: 6, message: 'Minimum 6 character required'
                                                            }
                                                        })}
                    
                                                        onKeyUp={() => {
                                                            trigger('password')
                                                        }}
                                                    />
                    
                                                    <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.password?.message}</small>
                                                </div>

                                                <div className="text-center mt-6">
                                                    <button
                                                        className="bg_bkash flex gap-1 items-center justify-center text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                        type="submit"
                                                    >
                                                        {loading && (
                                                            <ImSpinner9 size={15} className=" animate-spin" />
                                                        )}
                                                        <span>Verify Phone</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </>
                                    )
                                }

                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-full text-center">
                                <small className="text-white">Having trouble logging in? <a className="text-blue-300" href="#">click here</a></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
