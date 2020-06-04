import React from 'react';

const Champion = (props) => {
    console.log(props)
    return <div>The champion is..{props.champ? props.champ.name : 'TBA' } </div>
}

export default Champion

