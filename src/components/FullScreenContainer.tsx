import React from 'react';
import './FullScreenContainer.css';

export const FullScreenContainer: React.FC = ({ children }) => {
  return <div className="full-screen-container">{children}</div>;
};
