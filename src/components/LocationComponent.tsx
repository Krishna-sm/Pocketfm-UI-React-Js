"use client";
import { LocationSliceAddress, setLocation } from '@/redux/slices/Location.slice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const LocationComponent = () => {

    const dispatch = useDispatch()

    const askForLocationPermission = () => {
        navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
            if (permissionStatus.state !== 'denied') {
                // Permission previously denied
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // Handle location obtained
                        dispatch(setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
                    },
                    (error) => {
                        // Handle error
                    }
                );
            }  
        });
    };
    const allowLocation = async () => {

        console.log("for lock");
        
        try {
            const getLocation = (): Promise<PermissionStatus> => {
                if (navigator.permissions) {
                    return navigator.permissions.query({ name: 'geolocation' });
                } else {
                    return Promise.reject(new Error('Geolocation API not supported'));
                }
            };

            const permissionStatus = await getLocation();

            const handlePermissionChange = async(permissionStatus: PermissionStatus) => {
                if (permissionStatus.state === 'granted') {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            console.log(" latitude --->" + position.coords.latitude);
                            console.log(" longitude --->" + position.coords.longitude);
                            dispatch(setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
                        },
                        (error) => {
                            console.log("Error", error.message);
                            // Handle error here
                        }
                    );
                } else if (permissionStatus.state === 'prompt') {
                    console.log("promit");
                    
                    // Permission was not denied but also not granted, user may still be prompted 
                    await askForLocationPermission()
                    // You may want to display a message to the user to ask for permission again
                } else {
                    await askForLocationPermission()
 

                    // Permission denied or not available 
                    // You may want to display a message to the user indicating they need to enable location services
                }
            };

            // Watch for changes in geolocation permission status
            permissionStatus.onchange = () => {
                handlePermissionChange(permissionStatus);
            };

            // Handle permission status on initial load
            handlePermissionChange(permissionStatus);
        } catch (error:any) {
            toast.error(error.message);
        }
    };

  return (
      <div className=' w-[90%] min-h-screen flex justify-center items-center transition-all duration-300 mx-auto md:w-[80%] select-none'>
          <div className=" w-full transition-all duration-300  lg:w-[50%] py-4 px-2 mx-auto hover:shadow-xl shadow-lg  flex items-center justify-around rounded-lg flex-col gap-y-6">
              <div className="img">
                  <img src="https://cdn-icons-png.flaticon.com/128/1865/1865269.png" onContextMenu={(e) => e.preventDefault()} />
              </div>
              <div className="text">
                  <p className="text-xl text-center lg:text-4xl text-zinc-400">Please Allow Location</p>
                  <p className=" text-lg lg:text-xl text-zinc-400">without giving location can not access.</p>
              </div>
              <div className="py-2">
                  <button onClick={allowLocation} className="mx-auto border outline-none transition-all duration-300 bg-black hover:bg-[--selection-color] text-center px-12 py-2 text-white rounded-md">Allow</button>
              </div>
          </div>



    </div>
  )
}

export default LocationComponent