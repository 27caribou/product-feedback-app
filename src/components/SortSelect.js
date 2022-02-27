import Icon from "./Icon";
import { useState, useEffect} from "react";

const SortSelect = ({ type, initial, options, update }) => {

    const [ selected, setSelected ] = useState( initial )

    useEffect(() => {
        update(selected)
    }, [ selected ])

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
        <div className={ type == 'dark' ? 'custom-select dark-mode' : 'custom-select' }>
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