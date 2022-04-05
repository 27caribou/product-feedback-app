import Icon from "./Icon";
import { useState, useEffect} from "react";

const SortSelect = ({ type, textBefore, initial, options, update }) => {

    const [ selected, setSelected ] = useState( initial )
    const [ showDropDown, setShowDropDown ] = useState( false)

    useEffect(() => {
        setSelected(initial)
    }, [ initial ])

    useEffect(() => {
        update(selected)
    }, [ selected ])

    const chooseOption = option => {
        setSelected( option )
        setShowDropDown(false)
    }

    let classList = "custom-select"
    if ( type == "dark" ){
        classList += " dark-mode"
    }
    if ( showDropDown ){
        classList += " show"
    }

    // Adding tabindex to span, makes it focusable, so onBlur can work
    return (
        <div className={ classList }>
            <span
                tabIndex="0"
                onClick={ () => setShowDropDown(!showDropDown) }
                onBlur={ () => setShowDropDown(false) }
            >
                {textBefore} <span className='sort-value'>{selected}</span>
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