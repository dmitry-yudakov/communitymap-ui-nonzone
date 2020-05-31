import React from 'react';
import { Button, Input } from './components/library';
import './style/noncreate.css';

export default class NonCreate extends React.Component {
  render() {
    return (
      <div className="create">
        <div
          className="create__image"
          style={{
            backgroundImage: this.props.link
              ? `url(${this.props.link})`
              : `url(./default.png)`,
          }}
        ></div>
        <Input classBox={'create__title'} name={'Title'} />
        <Input
          type="textarea"
          classBox={'create__textarea'}
          class={'create__textarea--input'}
          name={'Description'}
        />

        <Button
          class={'create__button'}
          func={() => console.log('Закрыть окошко')}
        >
          Pin the none-zone!
        </Button>
      </div>
    );
  }
}
