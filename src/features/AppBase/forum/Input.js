import React from 'react'
import './input.css'

function InputOption({ Icon ,title  , color , onClick}) {
    return (
        <div className="inputOption"  onClick={onclick} >
            <Icon style={{color : color}}/>
            <p className="title">{title}</p>
           
        </div>
    )
}

export default InputOption;
