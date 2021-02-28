import React from 'react';

const ListItem = ({ contacts , onDelete}) => {
    return (
      <ul>
        {contacts.map(item => {
          return (
            <li key={item.id}>
              {item.name}  : {item.number}
              <button id={item.id} onClick={onDelete}> Delete </button>
            </li>  
          )
        })}
      </ul>
  ) 
};
export default ListItem;