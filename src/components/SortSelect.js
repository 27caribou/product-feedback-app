import Icon from "./Icon";
import {useState} from "react";

const SortSelect = ({ type, initial, options }) => {

    const [ selected, setSelected ] = useState( initial )

    const toggleOptions = () => {
        let select = document.querySelector('.custom-select')
        select.classList.toggle('show')
    }

    const closeOptions = () => {
        let select = document.querySelector('.custom-select')
        select.classList.remove('show')
    }

    const chooseOption = option => {
        setSelected( option )
        closeOptions()
    }

    // Adding tabindex to span, makes it focusable, so onBlur can work
    return (
        <div className={`custom-select ${type}`}>
            <span onClick={ toggleOptions } tabIndex="0" onBlur={ closeOptions }>
                Sort by: <span className='sort-value'>{selected}</span>
                <Icon name="arrow-down"/>
            </span>
            <ul className="dropdown">
                { options.map( option =>
                    <li key={option} onClick={ () => chooseOption(option) }>
                        {option}
                        { option === selected ? <Icon name='check'/> : '' }
                    </li>
                ) }
            </ul>
        </div>
    )
}

export default SortSelect