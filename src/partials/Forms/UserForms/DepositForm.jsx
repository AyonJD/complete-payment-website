import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { addDeposit } from '../../../utils/dbFuncs';
import { loadStorage } from '../../../utils/localStorage';

const DepositForm = ({ title }) => {
    const { register, formState: { errors }, handleSubmit, trigger, reset } = useForm();
    const user = loadStorage('payment_user')

    const onSubmit =async (data) => {
        if (user?.password !== data.password) {
            toast.error('Invalid password');
            return;
        }
        await addDeposit(user?.userUuid, { ...data, userUuid: user?.userUuid })
        reset();
    }

    return (
        <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg  border-0">
            <div className="rounded-t mb-0 px-7 pt-6">
                <div className="text-left">
                    <h6 className="text-gray-700 text-xl font-bold">{title}</h6>
                </div>
            </div>
            <div className="flex-auto px-4 py-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Account No
                                </label>
                                <input
                                    type="number"
                                    className="border-0 px-3 py-3 customInputClass placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
                                    Amount to Deposit
                                </label>
                                <input
                                    type="number"
                                    className="border-0 px-3 py-3 customInputClass placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
                                    className="border-0 px-3 py-3 customInputClass placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
                                    className="bg_bkash text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default DepositForm;