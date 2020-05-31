import React, { useMemo } from 'react';
import GoogleMapReact from 'google-map-react';
import './Maps.css';
import silverStyle from './MapsGoogleSilverStyle.json';
import darkStyle from './MapsGoogleDarkStyle.json';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || '';

const PinImg = () => (
  // <img style={{ display: 'block' }} alt="here" src="/pin.png" />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="white"
    width="45px"
    height="45px"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="#79CAB5"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    />
  </svg>
);

export const MapItem: React.FC<{ lat: number; lng: number }> = ({
  children,
}) => <>{children}</>;

const getProps = (theme: string) => {
  let styles: any = [
    {
      // disables poi
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ];
  if (theme === 'dark') {
    styles = darkStyle;
  } else if (theme === 'silver') {
    styles = silverStyle;
  }
  const options = {
    overviewMapControl: true,
    streetViewControl: false,
    rotateControl: true,
    mapTypeControl: false,
    zoomControl: false,
    fullscreenControl: false,
    styles,
  };
  return {
    defaultCenter: { lat: 42.69, lng: 23.32 },
    defaultZoom: 18,
    defaultOptions: options,
    options,
  };
};

interface MapsProps {
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  theme?: string;
  onChange: (
    centerLat: number,
    centerLng: number,
    minLat: number,
    maxLat: number,
    minLng: number,
    maxLng: number
  ) => void;
}

export const Maps: React.FC<MapsProps> = ({
  children,
  centerLat,
  centerLng,
  zoom,
  theme = 'standard',
  onChange,
}) => {
  const center = useMemo(() => {
    if (!centerLat || !centerLng) return undefined;
    return { lat: centerLat, lng: centerLng };
  }, [centerLat, centerLng]);
  const props = useMemo(() => getProps(theme), [theme]);
  return (
    <>
      <div id="center-pin">
        <PinImg />
      </div>
      <GoogleMapReact
        {...props}
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        center={center}
        zoom={zoom}
        onChange={(props) => {
          const {
            center,
            bounds: { sw, ne },
          } = props;
          console.debug('GoogleMaps onChange', props);
          onChange(center.lat, center.lng, sw.lat, ne.lat, sw.lng, ne.lng);
        }}
      >
        {children}
      </GoogleMapReact>
    </>
  );
};
