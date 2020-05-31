import React, { useState } from 'react';
// import { Button } from 'semantic-ui-react';
import { Button } from '../interface/components/library';
import { detectLocation } from '../utils';

export const NavigationWidget: React.FC<{
  onChangePosition: (lat: number, lng: number) => void;
  onChangeZoom: (zoom: number) => void;
}> = ({ onChangePosition, onChangeZoom }) => {
  const [loading, setLoading] = useState(false);

  const locate = async () => {
    setLoading(true);
    try {
      const pos = await detectLocation();
      onChangePosition(pos.latitude, pos.longitude);
    } catch (err) {
      console.log('Error getting location', err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="navigation-widget">
      <Button class={'app__button app__button--circle'} func={locate}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="25px"
          height="25px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </Button>

      <Button
        class={'app__button app__button--circle'}
        func={() => onChangeZoom(1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="26px"
          height="26px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
        </svg>
      </Button>
      <Button
        class={'app__button app__button--circle'}
        func={() => onChangeZoom(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="26px"
          height="26px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" />
        </svg>
      </Button>
      {/* <Button
        loading={loading}
        primary
        icon="location arrow"
        onClick={locate}
      ></Button> */}
    </div>
  );
};
