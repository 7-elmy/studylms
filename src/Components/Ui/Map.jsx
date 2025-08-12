import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export const MapComponent = () => {
  const center = {  lat: -3.745 , lng: -38.523, }; 

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};