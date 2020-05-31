import React, { useState } from 'react';
// import { Button, Modal } from 'semantic-ui-react';
import { ObjectItemInput } from '../types';
import { AddNewChatObject } from './Chat';
import { Login } from './Login';
import 'firebase/auth';
import { reportError, uploadToCloudinary } from '../utils';
import { AddNewPlaceObject } from './Place';
import { AddNewStoryObject } from './Story';
import './NewContentWidget.css';
import { Button } from '../interface/components/library';
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
      {/* <Button
        key="story"
        icon="edit outline"
        primary
        content="New"
        onClick={() => setAddType('story')}
        // onClick={() => setTakePicture(true)}
      /> */}
      <Button
        class={'app__button app__button--svg'}
        func={() => setAddType('story')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="18px"
          height="18px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
        New
      </Button>
    </div>
  );
};
