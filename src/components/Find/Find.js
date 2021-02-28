import React from 'react';

const Find = ({filter, handleChange}) => {
    return (
      <input type="text" value={filter} onChange={ handleChange}/>
    )
}
export default Find;