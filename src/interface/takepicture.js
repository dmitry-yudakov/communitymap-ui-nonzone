import React from 'react';
import './style/takepicture.css';
import { Button } from './components/library';

export default class TakePicture extends React.Component {
  render() {
    return (
      <div className="takepicture">
        <input
          type="file"
          accept="image/jpeg,image/png"
          className="takepicture__input"
        ></input>
        <Button
          class={'takepicture__button'}
          func={() => console.log('it works')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="22px"
            height="20px"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
            <path d="M12 17l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z" />
          </svg>
          Take a snapshot
        </Button>
      </div>
    );
  }
}
