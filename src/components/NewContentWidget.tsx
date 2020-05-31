import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { ObjectItemInput } from '../types';
import { AddNewChatObject } from './Chat';
import { Login } from './Login';
import 'firebase/auth';
import { reportError, uploadToCloudinary } from '../utils';
import { AddNewPlaceObject } from './Place';
import { AddNewStoryObject } from './Story';
import './NewContentWidget.css';
// import { TakePicture } from './TakePicture';
// import { FullScreenContainer } from './FullScreenContainer';

const AddNewObjectRender: React.FC<{
  type: ObjectItemInput['type'];
  onAdd: (item: ObjectItemInput) => Promise<any>;
  onClose: () => void;
}> = ({ type, onAdd, onClose }) => {
  switch (type) {
    case 'place':
      return <AddNewPlaceObject type={type} onPost={onAdd} />;
    case 'story':
      return <AddNewStoryObject type={type} onPost={onAdd} onClose={onClose} />;
    case 'chat':
    case 'request':
    case 'offer':
    default:
      return <AddNewChatObject type={type} onPost={onAdd} />;
  }
};

// const { REACT_APP_CLOUDINARY_CLOUD_NAME } = process.env;
// const uploadImage = (image: string) =>
//   uploadToCloudinary(REACT_APP_CLOUDINARY_CLOUD_NAME!, image);

export const NewContentWidget: React.FC<{
  authenticated: boolean;
  onAdd: (item: ObjectItemInput) => Promise<any>;
}> = ({ authenticated, onAdd }) => {
  const [addType, setAddType] = useState<ObjectItemInput['type'] | null>(null);
  // const [takePicture, setTakePicture] = useState(false);

  const showLogin = !authenticated && !!addType;

  return (
    <div id="new-content-widget">
      {showLogin && <Login />}
      {authenticated && (
        <>
          {/* {takePicture && (
            <FullScreenContainer>
              <TakePicture
                onClose={() => setTakePicture(false)}
                onPictureTaken={async (image) => {
                  console.log('image', image);
                  await uploadImage(image);
                  setTakePicture(false);
                  setAddType('story');
                }}
              />
            </FullScreenContainer>
          )} */}

          {!!addType && (
            // <Modal open size="tiny" closeIcon onClose={() => setAddType(null)}>
            // <Modal.Content>
            <AddNewObjectRender
              type={addType}
              onClose={() => setAddType(null)}
              onAdd={(it) =>
                onAdd(it)
                  .then(() => setAddType(null))
                  .catch(reportError)
              }
            />
            // </Modal.Content>
            // </Modal>
          )}
        </>
      )}
      {/* <h5>I want to post</h5>
      {([
        'chat',
        'request',
        'offer',
        // 'donation',
      ] as ObjectItemInput['type'][]).map((type) => (
        <Button
          key={type}
          icon={type2icon(type)}
          // basic
          primary
          content={type2title(type)}
          onClick={() => setAddType(type)}
        />
      ))}
      <hr />
      <Button
        key="place"
        icon="building"
        primary
        content="Place"
        onClick={() => setAddType('place')}
      />
      <hr /> */}
      <Button
        key="story"
        icon="edit outline"
        primary
        content="New"
        onClick={() => setAddType('story')}
        // onClick={() => setTakePicture(true)}
      />
    </div>
  );
};
