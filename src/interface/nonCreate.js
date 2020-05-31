import React from 'react';
import { Button, Input } from './components/library';
import './style/noncreate.css';

export default class NonCreate extends React.Component {
  state = {}

  render() {
    const { onChange, onCreate } = this.props
    return (
      <div className="create">
        <div
          className="create__image"
          style={{
            // backgroundImage: this.state.logoURL
            //   ? `url(${this.state.logoURL})`
            backgroundImage: this.props.link
              ? `url(${this.props.link})`
              : `url(./default.png)`,
          }}
        ></div>
        <Input classBox={'create__title'} name={'Title'} func={title => onChange({ title })} />
        {/* <Input classBox={'create__title'} name={'Title'} func={title => this.setState({title})}/> */}
        <Input
          type="textarea"
          classBox={'create__textarea'}
          class={'create__textarea--input'}
          name={'Description'}
          func={description => onChange({ description })}
        // func={description => this.setState({description})}
        />

        <Button
          class={'create__button'}
          func={() => onCreate()}
        >
          Pin the none-zone!
        </Button>
      </div>
    );
  }
}
