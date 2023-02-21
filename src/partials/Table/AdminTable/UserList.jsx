import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { getAllUser } from '../../../utils/dbFuncs';

const UserList = () => {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const [allUser, setAllUser] = React.useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Function to get the window width in pixels
    function getWindowWidth() {
        return window.innerWidth;
    }

    // Listen for changes to the window size
    window.addEventListener("resize", function () {
        // Set the window width to the state
        setWindowWidth(getWindowWidth());
    });

    // Fetch all user
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllUser();
            setAllUser(response);
        }
        fetchData();
    }, []);

    // Get the search value from input
    const handleSearch = (event) => {
        const term = event.target.value.trim();
        setSearchTerm(term);
        setIsLoading(true);
        debouncedSearch(term);
    };

    const debounce = (func, delay) => {
        let timerId;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                func.apply(context, args);
                setIsLoading(false);
            }, delay);
        };
    };

    const searchUsers = (term) => {
        const filteredUsers = allUser.filter((user) => {
            return Object.values(user.data).some((value) =>
                value.toString().toLowerCase().includes(term.toLowerCase())
            );
        });

        if (term === '') {
            setAllUser(allUser);
        } else {
            setAllUser(filteredUsers);
        }
    };

    const debouncedSearch = debounce(searchUsers, 1000);

    return (
        <>
            <div className={`relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded ${windowWidth > 600 ? 'shadow-lg' : ''}`}>
                <div className={`rounded-t mb-0 px-4 py-4 border-0 ${windowWidth <= 600 ? 'shadow-lg' : ''}`}>
                    <div className={`flex items-center justify-between ${windowWidth <= 460 ? 'flex-col' : ''}`}>
                        <div className={`relative w-full px-4 max-w-full flex-grow flex-1`}>
                            <h3 className="font-semibold text-base text-gray-700">
                                Account Information
                            </h3>
                        </div>
                        <div className={`relative w-full px-4 max-w-full flex-grow flex-1 text-right`}>
                            <input type="text" className={`customInputClass border-0 px-3 py-2 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full md:w-1/2 ease-linear transition-all duration-150 ${windowWidth <= 460 ? 'mt-4' : ''}`} placeholder="Search"
                                onChange={handleSearch}
                                onKeyUp={() => debouncedSearch(searchTerm)}
                            />
                        </div>

                    </div>
                </div>
                {
                    windowWidth > 600 ? (
                        <>
                            <div className="block w-full overflow-x-auto">

                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Name
                                            </th>
                                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Phone
                                            </th>
                                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Account Number
                                            </th>
                                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Akhama(NID)
                                            </th>
                                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Edit User
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allUser.map((user, index) => (
                                                <tr key={index} >
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                        {user?.data?.name}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {user?.data?.phone}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {user?.data?.accountNo}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {user?.data?.nidNo}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        <FaEdit
                                                            onClick={() => navigate(`/admin/user-list/${user.data.userUuid}`)}
                                                            className='text-lg text-gray-600 cursor-pointer ml-5' />
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="block w-full overflow-x-auto">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead className="main_bg">
                                        {
                                            allUser.map((user, index) => (
                                                <div onClick={() => navigate(`/admin/user-list/${user.data.userUuid}`)} className='my-7 w-full bg-white'>
                                                    <tr className=''>
                                                        <th className="w-[100vw] px-6 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                            Name : {user?.data?.name}
                                                        </th>

                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                            Phone : {user?.data?.phone}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                            Account Number :  {user?.data?.accountNo}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                            Akhama(NID) :  {user?.data?.nidNo}
                                                        </th>
                                                    </tr>
                                                </div>
                                            ))
                                        }
                                    </thead>
                                </table>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
};

export default UserList;