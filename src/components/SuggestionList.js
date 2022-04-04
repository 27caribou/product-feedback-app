import Icon from "./Icon";
import { Link } from "react-router-dom";

const SuggestionList = ({ sortType, items, upvote }) => {

    const labels = {
        'ui': 'UI',
        'ux': 'UX',
        'enhancement': 'Enhancement',
        'bug': 'Bug',
        'feature': 'Feature'
    }
    console.log('Number of comments + replies')

    const sortList = (items) => {
        let newList = [ ...items ]

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
    }

    return (
        <>
            <div className='suggestion-list'>
                {
                    sortList(items).map( (item) => (
                        <div key={item.id + ',' + item.upvotes} className="card feedback">
                            <span className="elem votes" onClick={ () => upvote(item) }>
                                <Icon name="arrow-up"/>
                                <span>{ item.upvotes }</span>
                            </span>
                            <div className="description">
                                <h3>{ item.title }</h3>
                                <p>{ item.description }</p>
                                <span className="elem">{ labels[item.category] }</span>
                            </div>
                            <span className="comments">
                                <Link to={`/feedback/${item.id}`}>
                                    <Icon name="comments" />
                                    <span>{ item.comments != null ? item.comments.length : 0 }</span>
                                </Link>
                            </span>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default SuggestionList