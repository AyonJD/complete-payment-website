import React from 'react';
import { loadStorage } from '../../../utils/localStorage';

const CardAbout = () => {
    const user = loadStorage("payment_user");
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    // Function to get the window width in pixels
    function getWindowWidth() {
        return window.innerWidth;
    }

    // Listen for changes to the window size
    window.addEventListener("resize", function () {
        // Set the window width to the state
        setWindowWidth(getWindowWidth());
    });

    return (
        <>
            

<div className={`relative flex flex-col min-w-0 break-words bg_bkash mb-6 shadow-lg rounded text-white`}>
            <div className="rounded-t mb-0 px-4 py-3 custom_border">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                        <h3 className="font-bold text-center text-lg">
                            Account Information
                        </h3>
                    </div>
                </div>
            </div>
            <>
                <div className="block w-full overflow-x-auto px-4 py-2 text-center">
                        
                        <div className='w-fit mx-auto'>
                            <h1 className='text-left font-semibold'>Name: { user?.name}</h1>
                            <h1 className='text-left py-1 font-semibold'>Phone: { user?.phone}</h1>
                            <h1 className='text-left font-semibold'>AC No: { user?.accountNo}</h1>
                            <h1 className='text-left pt-1 font-semibold'>Akhama (NID): { user?.nidNo}</h1>
                        </div>
                </div>
            </>

        </div>
        </>
    );
};

export default CardAbout;