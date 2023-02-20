import React, { useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { uid } from 'uid';
import { addUser } from '../../../utils/dbFuncs';
import fileUploader from '../../../utils/fileUploader';

const CreateUserForm = ({ title }) => {
    const { register, formState: { errors }, handleSubmit, trigger, reset } = useForm();
    const [country, setCountry] = useState('');
    const [currency, setCurrency] = useState('');
    const [image, setImage] = useState(null);
    const [bank, setBank] = useState('');

    const currencyArray = [
        { name: 'SGD', value: 'SGD' },
        { name: 'MYR', value: 'MYR' },
        { name: 'SAR', value: 'SAR' },
        { name: 'AED', value: 'AED' },
        { name: 'USD', value: 'USD' },
        { name: 'BDT', value: 'BDT' },
        { name: 'QAR', value: 'QAR' },
        { name: 'OMR', value: 'OMR' },
        { name: 'INR', value: 'INR' },
    ];

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

    const handleFileUpload = async (e) => {
        const downloadUrl = await fileUploader(e.target.files[0]);
        setImage(downloadUrl);
    }

    const onSubmit = (data) => {
        if (!currency || !country || !image ||!bank) {
            return toast.error('Please fill all the fields');
        }

        const uuid = uid();
        const dataToPush = {
            name: data.name,
            accountNo: data.accountNo,
            phone: `+88${data.phone}`,
            email: data.email,
            idNo: data.idNo,
            nidNo: data.nidNo,
            currency: currency,
            password: data.password,
            country: country,
            bakn: bank,
            amount: data.amount,
            image: image,
            userUuid: uuid,
            role: 'user',
            status: 'active',
            createdAt: new Date().toISOString(),
        }
        addUser(uuid, dataToPush);
        reset();
    }

    return (
        <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
            <div className="rounded-t bg-white mb-0 px-7 pt-6">
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
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    className="customInputClass border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder='Enter User Name'

                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: {
                                            value: 3, message: 'Minimum 3 character required'
                                        }
                                    })}

                                    onKeyUp={() => {
                                        trigger('name')
                                    }}
                                />
                                <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.name?.message}</small>
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
                                    Phone
                                </label>
                                <input
                                    type="number"
                                    className="customInputClass  border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder='Enter Phone No'

                                    {...register("phone", {
                                        required: 'Phone is required',
                                    })}

                                    onKeyUp={() => {
                                        trigger('phone')
                                    }}
                                />

                                <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.phone?.message}</small>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="customInputClass border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Enter Email"

                                    {...register("email", {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Please enter a valid Email"
                                        }
                                    })}
                                    onKeyUp={(e) => {
                                        trigger('email')
                                    }}
                                />

                                <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.email?.message}</small>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    ID Number
                                </label>
                                <input
                                    type="number"
                                    className="customInputClass border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Enter ID No"

                                    {...register("idNo", {
                                        required: 'ID is required',
                                        minLength: {
                                            value: 3, message: 'Minimum 3 character required'
                                        }
                                    })}

                                    onKeyUp={() => {
                                        trigger('idNo')
                                    }}
                                />

                                <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.idNo?.message}</small>
                            </div>
                        </div>

                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    NID Number
                                </label>
                                <input
                                    type="number"
                                    className="customInputClass border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Enter NID No"

                                    {...register("nidNo", {
                                        required: 'NID is required',
                                        minLength: {
                                            value: 13, message: 'Minimum 13 character required'
                                        }
                                    })}

                                    onKeyUp={() => {
                                        trigger('nidNo')
                                    }}
                                />

                                <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.nidNo?.message}</small>
                            </div>
                        </div>

                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Country
                                </label>
                                <CountryDropdown
                                    value={country}
                                    onChange={(val) => setCountry(val)}
                                    className="customInputClass border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                            </div>
                        </div>

                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Currency
                                </label>

                                <select
                                    className="customInputClass border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                   onChange={(e) => setCurrency(e.target.value)}
                                >
                                    <option value="">Select Currency</option>
                                    {currencyArray.map((item, index) => {
                                        return (
                                            <option key={index} value={item.value}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

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
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    className="customInputClass border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Enter Amount"

                                    {...register("amount", {
                                        required: 'Amount is required',
                                        minLength: {
                                            value: 3, message: 'Minimum 3 character required'
                                        }
                                    })}

                                    onKeyUp={() => {
                                        trigger('amount')
                                    }}
                                />

                                <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.amount?.message}</small>
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
                                <label
                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Image
                                </label>
                                <input
                                    type="file"
                                    className="customInputClass border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    onChange={(e) => handleFileUpload(e)}
                                />
                            </div>
                        </div>

                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <button
                                    className="bg_bkash text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Create
                                </button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserForm;