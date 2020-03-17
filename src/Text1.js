import React, { Component } from "react";
import ordreSup from './ordreSup';

class Text1 extends Component {  
  render() {
    const{state, handleChange, placeholder} = this.props;
    return (
      <>
        <input
          value={state.value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </>
    );
  }
}

export default ordreSup(Text1);
