import React, { useEffect, useState } from 'react';
import { loadStorage } from '../../../utils/localStorage';

const ProfileCard = () => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const user = loadStorage("payment_user");
  
  useEffect(() => {
    const geolocation = navigator.geolocation;
    if (!geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.0f6fa6ed048c22a24205c8ba2d264f0a&lat=${latitude}&lon=${longitude}&format=json`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
  
          const city = data.address.city || data.address.town || data.address.county;
          const state = data.address.state;

          setAddress(`${city}, ${state}`);
        })
        .catch(error => {
          console.error('Error fetching location:', error);
          setError('Failed to fetch location.');
        });
    }, error => {
      console.error('Error getting geolocation:', error);
      setError('Failed to get geolocation.');
    });
  }, []);


  return (
    <>
      <div className="border-bkash relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src={user?.image}
                  className="shadow-xl rounded-full w-[150px] align-middle border-none -mt-16 "
                />
              </div>
            </div>
            <div className="w-full px-4 text-center">
              <div className="flex flex-col justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-md font-bold text_bkash">Current Balance</span>
                  <span className="text-xl font-bold block uppercase tracking-wide text_bkash">
                    {`1000000 ${ user?.currency}` }
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-gray-700 ">
              { user?.name}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-400"></i>{" "}
              {
                address ? address : 'Please allow location access to see your current location.'
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;