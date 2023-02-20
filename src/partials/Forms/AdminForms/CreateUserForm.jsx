import React, { useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { useForm } from 'react-hook-form';
import { uid } from 'uid';
import { addUser } from '../../../utils/dbFuncs';
import fileUploader from '../../../utils/fileUploader';

const CreateUserForm = ({ title }) => {
    const { register, formState: { errors }, handleSubmit, trigger, reset } = useForm();
    const [country, setCountry] = useState('');
    const [image, setImage] = useState(null);

    const handleFileUpload = async (e) => {
        const downloadUrl = await fileUploader(e.target.files[0]);
        setImage(downloadUrl);
    }

    const onSubmit = (data) => {
        const uuid = uid();
        const dataToPush = {
            name: data.name,
            accountNo: data.accountNo,
            phone: `+88${data.phone}`,
            email: data.email,
            idNo: data.idNo,
            nidNo: data.nidNo,
            currency: data.currency,
            password: data.password,
            country: country,
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
                                <input
                                    type="text"
                                    className="customInputClass border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Enter Currency"

                                    {...register("currency", {
                                        required: 'Currency is required',
                                    })}

                                    onKeyUp={() => {
                                        trigger('currency')
                                    }}
                                />

                                <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.currency?.message}</small>
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