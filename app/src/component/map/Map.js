import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { RenderAfterNavermapsLoaded, NaverMap, Circle } from 'react-naver-maps'
import './map.css'

function NaverMapAPI({ latLng }) {
    const [storeData, setStoreData] = useState([])
    const [position, setPosition] = useState(latLng)
    const MaskData = async () => {
        try {
            const data = await axios.get(`https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${position.lat}&lng=${position.lng}&m=1000`)
            return setStoreData(data.data.stores)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(MaskData, [])

    const colorWheel = (i) => {
        if (i.remain_stat === "few") {
            return "red"
        }
        else if (i.remain_stat === "some") {
            return "yellow"
        }
        else if (i.remain_stat === "plenty") {
            return "green"
        }
        else {
            return "gray"
        }
    }

    const alertMessage = (i) => {
        switch (i.remain_stat) {
            case 'empty':
                return alert(`${i.name}에는 마스크가 없어요`)

            case 'few':
                return alert(`${i.name}에는 마스크가 조금 있어요(30개 미만)`)

            case 'some':
                return alert(`${i.name}에는 마스크가 어느 정도 있어요(100개 미만)`)

            case 'plenty':
                return alert(`${i.name}에는 마스크가 꽤 있어요(100개 미만)`)

            default:
                break;
        }

    }

    return (
        <NaverMap
            mapDivId={'maps-getting-started-uncontrolled'}
            style={{
                margin: 'auto',
                width: '100%',
                height: '80vh',
                position: 'relative'
            }}
            defaultZoom={17}
            center={position}
            onCenterChanged={center => setPosition({ lat: center._lat, lng: center._lng })}
            onDragend={() => MaskData()}

        >
            {
                storeData ? storeData.map(i => <Circle
                    key={i.code}
                    center={{ lat: i.lat, lng: i.lng }}
                    radius={10}
                    fillOpacity={0.5}
                    fillColor={colorWheel(i)}
                    strokeColor={'black'}
                    clickable={true}
                    onClick={() => alertMessage(i)}
                />) : null
            }
            <div className="mapover">
                <ul>
                    <li>100개 이상</li>
                    <li>30개 이상</li>
                    <li>30개 미만</li>
                    <li>0개</li>
                </ul>
            </div>
        </NaverMap >
    );
}


function Map({ latLng }) {
    return (
        <>
            <RenderAfterNavermapsLoaded
                ncpClientId={'1gzg5f9gv9'} // 자신의 네이버 계정에서 발급받은 Client ID
                error={<p>Maps Load Error</p>}
                loading={<p>Maps Loading...</p>}
            >
                <NaverMapAPI latLng={latLng} />
            </RenderAfterNavermapsLoaded>
        </>
    )
}

export default Map
