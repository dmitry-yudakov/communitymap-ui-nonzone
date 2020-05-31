import React from 'react';
import './style/point.css';

export default class Point extends React.Component {
  render() {
    return (
      <div className="point">
        <div className="point__point"></div>
		<p className="point__name">{this.props.name}</p>
        <p className="point__coords">{this.props.coords}</p> 
      </div>
    );
  }
}
