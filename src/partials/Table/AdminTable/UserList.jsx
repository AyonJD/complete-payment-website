import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUser } from '../../../utils/dbFuncs';

const UserList = () => {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const [allUser, setAllUser] = React.useState([]);
    const navigate = useNavigate();

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

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-gray-700">
                                Account Information
                            </h3>
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

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allUser.map((user, index) => (
                                                <tr key={index} onClick={() => navigate(`/admin/user-list/${user.data.userUuid}`)}>
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
                                    <thead className="thead-light">
                                        {
                                            allUser.map((user, index) => (
                                                <>
                                                    <tr>
                                                        <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                            Name : {user?.data?.name}
                                                        </th>

                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                            Phone : {user?.data?.phone}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                            Account Number :  {user?.data?.accountNo}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                            Akhama(NID) :  {user?.data?.nidNo}
                                                        </th>
                                                    </tr>
                                                </>
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