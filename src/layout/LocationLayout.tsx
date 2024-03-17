"use client";
import LocationComponent from '@/components/LocationComponent';
import { LocationSliceAddress, setLocation } from '@/redux/slices/Location.slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const LocationLayout = ({children}:{children:React.ReactNode}) => {
    // const [latitude, setLatitude] = useState(0);
    // const [longitude, setLongitude] = useState(0);

        const dispatch = useDispatch();
    const selector = useSelector(LocationSliceAddress)

    const allowLocation = async () => {
        try {
            const getLocation = (): Promise<PermissionStatus> => {
                if (navigator.permissions) {
                    return navigator.permissions.query({ name: 'geolocation' });
                } else {
                    return Promise.reject(new Error('Geolocation API not supported'));
                }
            };

            const permissionStatus = await getLocation();

            const handlePermissionChange = async (permissionStatus: PermissionStatus) => {
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
                    // Permission was not denied but also not granted, user may still be prompted 
                    await allowLocation()
                    // You may want to display a message to the user to ask for permission again
                } else {
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
        } catch (error: any) {
            toast.error(error.message);
        }
    };


    useEffect(() => {
        (async() => await allowLocation())()
    }, []);

    if (!selector){
        return <LocationComponent/>
    }

  return (
      <>{children}</>
  )
}

export default LocationLayout