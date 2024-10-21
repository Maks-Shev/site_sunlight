import React, { memo, useEffect } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const MapComponent = memo(({ zoomValue = 15 }) => {
    const mapState = {
        center: [53.524348, 49.30036],
        zoom: zoomValue,
    };

    useEffect(() => {
        console.log("MapComponent rendered");
    }, []);

    return (
        <YMaps query={{ apikey: "938ee750-5889-4aac-8e35-f3c19fdd3708" }}>
            <Map defaultState={mapState} width="100%" height="100%">
                <Placemark geometry={[53.524348, 49.30036]} />
            </Map>
        </YMaps>
    );
});

export default MapComponent;