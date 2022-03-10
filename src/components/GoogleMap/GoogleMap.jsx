import React, { useEffect, useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '400px',
    height: '400px'
}

function GoogleMaps({ setLocation, location }) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_KEY
    })

    const [map, setMap] = useState(null)

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const [center, setCenter] = useState({
        lat: 40.39274993833529,
        lng: -3.698461840170875
    })
    useEffect(() => {
        setCenter({
            lat: location.coordinates[0], lng: location.coordinates[1]
        })
    }, [location])



    function getLocation(e) {
        console.log([e.latLng.lat(), e.latLng.lng()])
        setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() })

        console.log('ESTE ES EL SETLOCATION DEL MAPA')
        setLocation({name: '', coordinates: [e.latLng.lat(), e.latLng.lng()]})
    }

    return isLoaded ? (
        <GoogleMap onClick={(e) => getLocation(e)}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onUnmount={onUnmount}
        >

            <Marker position={center} />
            <></>
        </GoogleMap>
    ) : <></>
}

export default GoogleMaps