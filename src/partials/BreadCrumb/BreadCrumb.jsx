import React from 'react';
import { loadStorage } from '../../utils/localStorage';

const Breadcrumb = ({ title }) => {
    const user = loadStorage("payment_user");

    return (
        <div className="breadcrumb flex items-center px-4 mb-2 pt-4">
            <h1 className='text-sm font-medium text-gray-500 '> {title} </h1>
            <h1 className='text-sm font-medium text-gray-400 mx-2'> {`>`} </h1>
            <h1 className='text-sm font-medium text-gray-500 '> {user?.name} </h1>

        </div>
    );
};

export default Breadcrumb;