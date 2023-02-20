import React from 'react';
import { Link } from 'react-router-dom';

const MenuCard = ({
    statSubtitle,
    statUrl,
    statIconName,
    statIconColor,
}) => {
    return (
        <>
            <Link to={statUrl}>
                <div className={`cursor-pointer relative flex flex-col min-w-0 break-words  rounded mb-6 xl:mb-0 shadow-lg bg-white`}>
                    <div className="flex-auto p-4">
                        <div className="flex justify-center items-center flex-col">

                            <div className="relative w-auto flex-initial">
                                <div
                                    className={
                                        "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                                        statIconColor
                                    }
                                >
                                    <i className={statIconName}></i>
                                </div>
                            </div>

                            <div className="flex justify-center items-center flex-col">
                                <h6 className="text-gray-400 uppercase font-bold text-xs mt-2 mx-auto inline-block text-center">
                                    {statSubtitle}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default MenuCard;