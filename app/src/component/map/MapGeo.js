import React, { useEffect, useState } from 'react'
import Map from './Map'

function MapGeo() {
    const [latLng, setLatLng] = useState({ lat: null, lng: null })

    const askForCoords = () => {
        const handleGeoSuccess = (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            setLatLng({ lat: latitude, lng: longitude })
        }
        const handleGeoError = () => {
            console.error('위치 정보를 획득 실패!')
        }
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
    }

    useEffect(() => askForCoords(), [])
    console.log(latLng)
    return (
        <>
            <Map latLng={latLng} />
        </>)
}

export default MapGeo