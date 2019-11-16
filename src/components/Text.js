import React from 'react';

const textstyle = {
  fontStyle: 'oblique',
  color: '#778899'
}

const Text = (props) => {
  return (
     <h1 style={textstyle}>{props.children}</h1>
  )
}

export default Text;