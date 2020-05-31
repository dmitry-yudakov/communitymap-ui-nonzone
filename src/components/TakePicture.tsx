import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import './TakePicture.css';
import { Button } from 'semantic-ui-react';

export const TakePicture: React.FC<{
  onClose: () => void;
  onPictureTaken: (image: string) => Promise<any>;
}> = ({ onClose, onPictureTaken }) => {
  const ref = useRef<any>();
  const videoConstraints = {
    facingMode: 'environment',
  };
  const onTakePicuture = () => {
    const image = ref.current!.getScreenshot();
    onPictureTaken(image);
  };

  return (
    <div className="take-picture">
      <Webcam
        videoConstraints={videoConstraints}
        audio={false}
        // height={'100%'}
        // width={'100%'}
        height={window.innerHeight}
        width={window.innerWidth}
        ref={ref}
        screenshotFormat="image/jpeg"
      />
      <Button
        icon="close"
        className="close-take-picture-button"
        circular
        onClick={onClose}
      />
      <div className="take-picture-bottom">
        <Button
          className="take-picture-button"
          circular
          onClick={onTakePicuture}
        />
      </div>
    </div>
  );
};
