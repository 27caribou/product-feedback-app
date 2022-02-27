import { useState, useEffect } from "react";
import Icon from "./Icon";

const SuggestionList = ({ sortType, items }) => {

    const [ itemList, setList ] = useState( items )

    useEffect(() => {
        console.log('Sort is now: ' + sortType)

        setList( oldList => {
            let newList = [ ...oldList ]

            if ( sortType == 'Most upvotes' ){
                newList.sort( (a, b) => b.upvotes - a.upvotes )

            } else if ( sortType == 'Least upvotes' ){
                newList.sort( (a, b) => a.upvotes - b.upvotes )

            } else if ( sortType == 'Most comments' ){
                newList.sort( (a, b) => {
                    const com1 = a.comments != null ? a.comments.length : 0
                    const com2 = b.comments != null ? b.comments.length : 0
                    return com2 - com1
                })
            } else {
                newList.sort( (a, b) => {
                    const com1 = a.comments != null ? a.comments.length : 0
                    const com2 = b.comments != null ? b.comments.length : 0
                    return com1 - com2
                })
            }
            return newList
        })

    }, [sortType])


    console.log(itemList)
    return (
        <>
            <div className='suggestion-list'>
                {
                    itemList.map( (item, index) => (
                        <div key={item.id} className="card feedback">
                            <span className="elem votes">
                                <Icon name="arrow-up"/>
                                <span>{ item.upvotes }</span>
                            </span>
                            <span>{ `item${item.id}` }</span>
                            <span>{ item.title }</span>
                            <span>{ item.category }</span>
                            <span>{ item.comments != null ? item.comments.length : 0 } sms</span>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default SuggestionList