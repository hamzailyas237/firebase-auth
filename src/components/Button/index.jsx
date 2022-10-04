

import React from 'react'

const Button = (props) => {
    return (
        <div>
            <button className='btn btn-primary'>{props.btnText}</button>
        </div>
    )
}

export default Button