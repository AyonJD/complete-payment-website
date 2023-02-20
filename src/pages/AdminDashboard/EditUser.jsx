import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CountryDropdown } from 'react-country-region-selector';
import Footer from '../../partials/Footer';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import fileUploader from '../../utils/fileUploader';
import { getUserByUuid, updateUser } from '../../utils/dbFuncs';
import { useParams } from 'react-router-dom';
import { loadStorage } from '../../utils/localStorage';

const EditUser = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { register, formState: { errors }, handleSubmit, trigger, reset } = useForm();
    const [image, setImage] = useState(null);
    const [user, setUser] = useState(null);
    const [country, setCountry] = useState(user?.country);
    const { uuid } = useParams();
    const currentUser = loadStorage('payment_user')

    useEffect(() => {
        if (currentUser.role !== 'admin') {
            window.location.replace('/');
             return;
         }
        
        const fetchData = async () => {
            const user = await getUserByUuid(uuid);

            if (!user) return toast.error("User not found!");
            setUser(user.data);
        }
        fetchData();
    }, []);

    const handleFileUpload = async (e) => {
        const downloadUrl = await fileUploader(e.target.files[0]);
        setImage(downloadUrl);
    }

    const onSubmit = (data) => {
        const dataToPush = {
            name: data.name || user?.name,
            accountNo: data.accountNo || user?.accountNo,
            phone: data.phone ? `+88${data.phone}` : user?.phone,
            email: data.email || user?.email,
            idNo: data.idNo || user?.idNo,
            nidNo: data.nidNo || user?.nidNo,
            currency: data.currency || user?.currency,
            password: data.password || user?.password,
            country: country || user?.country,
            image: image || user?.image,
            userUuid: uuid || user?.userUuid,
            role: 'user',
            status: 'active',
            createdAt: user?.createdAt,
            updatedAt: new Date().toISOString(),
        }
        updateUser(uuid, dataToPush);
    }

    return (
        <div className="flex overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <div className="height_handle">
                    <main className='height_handle mt-7'>
                        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">
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
                                                    defaultValue={user?.name}

                                                    {...register("name", {
                                                        required: false,
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
                                                    defaultValue={user?.accountNo}

                                                    {...register("accountNo", {
                                                        required: false,
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
                                                    defaultValue={user?.phone}

                                                    {...register("phone", {
                                                        required: false,
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
                                                    defaultValue={user?.email}

                                                    {...register("email", {
                                                        required: false,
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
                                                    defaultValue={user?.idNo}

                                                    {...register("idNo", {
                                                        required: false,
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
                                                    defaultValue={user?.nidNo}

                                                    {...register("nidNo", {
                                                        required: false,
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
                                                    defaultValue={user?.currency}

                                                    {...register("currency", {
                                                        required: false,
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
                                                    defaultValue={user?.password}

                                                    {...register("password", {
                                                        required: false,
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
                                                    Update
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>

            </div>
        </div>
    );
};

export default EditUser;