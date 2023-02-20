import React, { useEffect, useState } from 'react';
import { getUserByPhone } from '../../../utils/dbFuncs';
import { loadStorage } from '../../../utils/localStorage';

const CardBalance = () => {
    const user = loadStorage("payment_user");
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const _retriveData = async () => { 
            const _user = await getUserByPhone(user.phone);
            setCurrentUser(_user);
        }
        _retriveData();
    }, [])

    return (
        <div className={`relative flex flex-col min-w-0 break-words bg_bkash mb-6 shadow-lg rounded text-white py-5`}>
            <div className="rounded-t mb-0 px-4  border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-bold text-lg text-center">
                            Available Balance
                        </h3>
                    </div>
                </div>
            </div>
            <>
                <div className="block w-full overflow-x-auto py-2">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead className="thead-light">
                            <tr>
                                <th className="">
                                <h1 className=' font-bold px-6 align-middle border border-solid border-gray-100 py-3 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap text-center'>Amount</h1>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border-t-0 text-bkash px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 pt-2 pb-0 text-center text-2xl font-bold block uppercase tracking-wide">
                                    {`${currentUser?.data?.amount} ${currentUser?.data?.currency}`}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>

        </div>
    );
};

export default CardBalance;