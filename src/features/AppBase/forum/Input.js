import React from 'react'
import './input.css'

function InputOption({ Icon ,title  , color , onClick}) {
    return (
        <div className="inputOption"  onClick={onclick} >
            <Icon style={{color : color}}/>
            <h4>{title}</h4>
           
        </div>
    )
}

export default InputOption;
