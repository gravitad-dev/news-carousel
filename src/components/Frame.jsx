import React from 'react';

const Frame = ({ src }) => {
  const iframeStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    zIndex: 9999,
  };

  return (
    <iframe
      src={src}
      style={iframeStyle}
      title="Full Screen Iframe"
      frameBorder="0"
      allowFullScreen
    />
  );
};

export default Frame;
