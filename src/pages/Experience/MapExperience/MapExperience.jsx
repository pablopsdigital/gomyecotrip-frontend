import React, {useCallback, useState} from 'react';
import './MapExperience.scss';

import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import customStyleMap from '../../Experiences/MapGoogle/customStyleMap';

const containerStyle = {
  width: '100%',
  height: '350px'
};

export default function MapExperience({experience, ...props}) {
  //=================================================================
  //Configure params and data map
  //=================================================================
  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_KEY
  });

  const [map, setMap] = useState(null);
  const [selectMarker, setSelectedMarker] = useState(null);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  //=================================================================
  //Render
  //=================================================================
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: experience.address.lat,
        lng: experience.address.lng
      }}
      options={{
        styles: customStyleMap.gomyecotripStyleMapClay,
        // disableDefaultUI: true,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_TOP
        },
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_BOTTOM
        },
        gestureHandling: 'greedy'
      }}
      zoom={6}
      onUnmount={onUnmount}
    >
      <Marker
        key={experience._id}
        position={{
          lat: experience.address.lat,
          lng: experience.address.lng
        }}
        label={{
          text: `${experience.ratesForPerson.adults}`,
          className: 'marker-label'
        }}
        onClick={() => {
          setSelectedMarker(experience);
        }}
        icon={{
          path: window.google.maps.SymbolPath.CIRCLE,
          strokeColor: '#53268f',
          fillColor: '#53268f',
          fillOpacity: 1,
          strokeWeight: 1,
          scale: 7
        }}
      ></Marker>
    </GoogleMap>
  ) : (
    <></>
  );
}
