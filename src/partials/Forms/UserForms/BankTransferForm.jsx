import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { loadStorage } from '../../../utils/localStorage';
import OtpVerifyPopup from '../../Popups/OtpVerifyPopup';
import { ImSpinner9 } from "react-icons/im";
import { auth } from '../../../Config/firebase.config';
import { addBankTransfer, findUserByAccountNumber, getUserByPhone, updateUser } from '../../../utils/dbFuncs';
import VatTokenPopup from '../../Popups/VatTokenPopup';

const BankTransferForm = ({ title }) => {
    const { register, formState: { errors }, handleSubmit, trigger, reset } = useForm();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const user = loadStorage('payment_user');
    const [currentUser, setCurrentUser] = useState({})
    const [bank, setBank] = useState('');
    const [data, setData] = useState({});
    const [openVatTokenPopup, setOpenVatTokenPopup] = useState(false);
    const [openOtpPopup, setOpenOtpPopup] = useState(false);
    const bankList = [
        { id: 1, name: 'AB Bank Limited' },
        { id: 2, name: 'Agrani Bank limited' },
        { id: 3, name: 'Al Arafa Bank limited' },
        { id: 4, name: 'Al Bilad Bank' },
        { id: 5, name: 'Al Jazira Bank limited' },
        { id: 6, name: 'Al Raji Bank limited' },
        { id: 7, name: 'Al-Arafah Islami Bank Limited' },
        { id: 8, name: 'Alinma Bank limited' },
        { id: 9, name: 'Ansar VDP Unnayan Bank' },
        { id: 10, name: 'Bangladesh Commerce Bank Limited' },
        { id: 11, name: 'Bangladesh Development Bank Limited' },
        { id: 12, name: 'Bangladesh Krishi Bank' },
        { id: 13, name: 'Bank Asia limited' },
        { id: 14, name: 'Bank Muscat' },
        { id: 15, name: 'Bank Of Baroda' },
        { id: 16, name: 'Banque Saudi Fransi' },
        { id: 17, name: 'Bengal Commercial Bank Limited' },
        { id: 18, name: 'BRAC Bank Limited' },
        { id: 19, name: 'City Bank limited' },
        { id: 20, name: 'Datch Bangla Bank limited' },
        { id: 21, name: 'Dhaka Bank limited' },
        { id: 22, name: 'Eastern Bank Limited' },
        { id: 23, name: 'EBL Bank limited' },
        { id: 24, name: 'Export Import Bank of Bangladesh Limited' },
        { id: 25, name: 'First Security Islami Bank Limited' },
        { id: 26, name: 'HSBC Bank limited' },
        { id: 27, name: 'ICB Islamic Bank Limited' },
        { id: 28, name: 'IFIC Bank limited' },
        { id: 29, name: 'Indian Bank Limited' },
        { id: 30, name: 'International Finance Invest and Commerce Bank Limited' },
        { id: 31, name: 'Islami Bank Bangladesh Limited' },
        { id: 32, name: 'Jamnuna Bank Limited' },
        { id: 33, name: 'Janata Bank limited' },
        { id: 34, name: 'Karmashangosthan Bank' },
        { id: 35, name: 'Malaysia Bank limited' },
        { id: 36, name: 'MayBank Malaysia' },
        { id: 37, name: 'Mcash' },
        { id: 38, name: 'Meghna Bank Limited' },
        { id: 39, name: 'Mercantile Bank Limited' },
        { id: 40, name: 'Midland Bank Limited' },
        { id: 41, name: 'Modhumoti Bank Limited' },
        { id: 42, name: 'Mutual Trust Bank Limited' },
        { id: 43, name: 'Nagad' },
        { id: 44, name: 'National Bank Limited' },
        { id: 45, name: 'National Credit & Commerce Bank Limited' },
        { id: 46, name: 'NRB Commercial Bank Limited' },
        { id: 47, name: 'One Bank Limited' },
        { id: 48, name: 'Padma Bank Limited' },
        { id: 49, name: 'Palli Sanchay Bank' },
        { id: 50, name: 'POSB Bank' },
        { id: 51, name: 'POSB BANK SINGAPORE' },
        { id: 52, name: 'Prime Bank Limited' },
        { id: 53, name: 'Pubali Bank limited' },
        { id: 54, name: 'RASTRIYA BANIJYA BANK LTD' },
        { id: 55, name: 'Rocket' },
        { id: 56, name: 'Saudi International bank' },
        { id: 57, name: 'SBI BANK' },
        { id: 58, name: 'Shahjalal Bank limited' },
        { id: 59, name: 'Shahjalal Islami Bank Limited' },
        { id: 60, name: 'Social Islami Bank Limited' },
        { id: 61, name: 'Sonali Bank limited' },
        { id: 62, name: 'Soudhi Bank limited' },
        { id: 63, name: 'South Bangla Agriculture & Commerce Bank Limited' },
        { id: 64, name: 'Southeast Bank Limited' },
        { id: 65, name: 'SUNRISE BANK LIMITED' },
        { id: 66, name: 'The City Bank Limited' },
        { id: 67, name: 'The Premier Bank Limited' },
        { id: 68, name: 'Trust Bank Limited' },
        { id: 69, name: 'Union Bank Limited' },
        { id: 70, name: 'United Commercial Bank Limited' },
        { id: 71, name: 'UOB Bank limited' },
        { id: 72, name: 'Uttora Bank limited' },
    ];

    useEffect(() => {
        const _retriveData = async () => { 
            const _user = await getUserByPhone(user.phone);
            setCurrentUser(_user);
        }
        _retriveData();
    }, [])

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
    const onSignIn = async () => {
        setLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;
        const phone = user?.phone;

        signInWithPhoneNumber(auth, phone, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                toast.success("OTP sended successfully!");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    // OTP verifier
    const onOTPVerify = () => {
        setOtpLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                setOtpLoading(false);
                toast.success("OTP verified successfully!")
                addBankTransfer(user?.userUuid, { accountNo: data.accountNo, amount: data.amount, password: data.password, bank, userUuid: user?.userUuid });
                setOpenVatTokenPopup(false);
                setOpenOtpPopup(false);
            })
            .catch((err) => {
                toast.error('Wrong OTP!')
                setOtpLoading(false);
            });
    };

    const onSubmit = async (data) => {
        if (!bank) {
            toast.error('Please select a bank');
            return;
        }
        if (data.password !== user?.password) {
            toast.error('Wrong password!');
            return;
        }

        if (currentUser.data.amount < data.amount) {
            toast.error('Insufficient balance!');
            return;
        }

        setData(data);
        // setOpenVatTokenPopup(true);

        // Find user by account number
        const remoteUser = await findUserByAccountNumber(data.accountNo, bank);
        if (!remoteUser) { 
            toast.error('Account number not found!');
            return;
        }
        // Update local user
        updateUser(user.userUuid, { ...currentUser.data, amount: Number(currentUser.data.amount) - Number(data.amount) })
        
        // Update remote user
        updateUser(remoteUser.data.userUuid, { ...remoteUser.data, amount: Number(remoteUser.data.amount) + Number(data.amount) })

        reset();
    };


    return (
        <>
            <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
                <div className="rounded-t bg-white mb-0 px-7 pt-6">
                    <div id="recaptcha-container"></div>
                    <div className="text-left">
                        <h6 className="text-gray-700 text-xl font-bold">{title}</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 py-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Bank Name
                                    </label>
                                    <select
                                        className="customInputClass border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        id="bank-select"
                                        onChange={(e) => setBank(e.target.value)}
                                    >
                                        <option value="">Select Bank</option>
                                        {bankList.map((bank) => (
                                            <option key={bank.id} value={bank.name}>
                                                {bank.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Account No
                                    </label>
                                    <input
                                        type="number"
                                        className="customInputClass border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder='Enter Account No'

                                        {...register("accountNo", {
                                            required: "Account is required",
                                            minLength: {
                                                value: 8, message: 'Minimum 8 character required'
                                            }
                                        })}

                                        onKeyUp={() => {
                                            trigger('accountNo')
                                        }}
                                    />

                                    <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.accountNo?.message}</small>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Amount to Cash Out
                                    </label>
                                    <input
                                        type="number"
                                        className="customInputClass  border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder='Enter Amount'

                                        {...register("amount", {
                                            required: "Account is required"
                                        })}

                                        onKeyUp={() => {
                                            trigger('amount')
                                        }}
                                    />

                                    <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.accountNo?.message}</small>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
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
                                        placeholder="Enter Password"

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
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <button
                                        className="bg_bkash text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex"
                                        type="submit"
                                    >
                                        {loading && (
                                            <ImSpinner9 size={15} className=" animate-spin" />
                                        )}
                                        <span>Submit</span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            {
                openVatTokenPopup && <VatTokenPopup onSignIn={onSignIn} openOtpPopup={openOtpPopup} setOpenOtpPopup={setOpenOtpPopup} loading={loading} otp={otp} setOtp={setOtp} onOTPVerify={onOTPVerify} setOpenVatTokenPopup={setOpenVatTokenPopup} />
            }

{
                openOtpPopup && <OtpVerifyPopup loading={otpLoading} otp={otp} setOtp={setOtp} onOTPVerify={onOTPVerify} setOpenOtpPopup={setOpenOtpPopup}/>
            }
        </>
    );
};

export default BankTransferForm;