import React from 'react';
import { Button } from './components/library';
import './style/noncart.css';

export default class NonCart extends React.Component {
  render() {
    return (
      <div className="position">
        <div
          className="position__image"
          style={{
            backgroundImage: this.props.link
              ? `url(${this.props.link})`
              : `url(./default.png)`,
          }}
        ></div>
        <h5 className="position__name">{this.props.name}</h5>
        <p className="position__description">{this.props.description}</p>
        <div className="position__wc">
          <p className="position__author">{this.props.author}</p>
          <p className="position__data">{this.props.data}</p>
        </div>
		<Button class={"position__button"} func={()=>console.log("Закрыть окошко")} >Close the cart</Button>
      </div>
    );
  }
}
