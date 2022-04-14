import Icon from "./Icon";
import { useState, useEffect } from "react";

const CustomSelect = ({ value, options }) => {

    const [ current, setCurrent ] = useState( value != null ? value : options[0] )

    return (
        <div tabIndex="0" className="custom-select"
             onClick={ e => e.target.closest(".custom-select").classList.toggle("show") }
             onBlur={ e => e.target.closest(".custom-select").classList.remove("show") }
        >
            <div className="current-option">
                <div className="inner">{ current }</div>
                <Icon name="arrow-down"/>
            </div>
            <ul className="dropdown">
                { options.map( option =>
                    <li key={option} onClick={ () => setCurrent(option) }>
                        { option }
                        { option === current ? <Icon name='check'/> : '' }
                    </li>
                ) }
            </ul>
        </div>
    )
}

export default CustomSelect