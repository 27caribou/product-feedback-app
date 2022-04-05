import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import SortSelect from "./SortSelect";
import SuggestionList from "./SuggestionList";

const Suggestions = ({ data, isFetching, upvote }) => {

    const [ sort, setSort ] = useState( 'Most upvotes' )

    const header = <div className="card suggestion-header">
        <div>
            <span className="icon">
                <Icon name="suggestions"/>
            </span>
            <span className='suggestions-number'>{data.length} Suggestions</span>
            <span>
                <SortSelect
                    type='dark'
                    textBefore="Sort by:"
                    initial={ 'Most upvotes' }
                    options={[ 'Most upvotes', 'Least upvotes', 'Most comments', 'Least comments' ]}
                    update={ i => setSort(i) }
                />
            </span>
        </div>
        <div>
            <Link to="/new-feedback">
                <button className="custom-btn purple">+ Add Feedback</button>
            </Link>
        </div>
    </div>

    // Perhaps hide everything until data is fetched? In case someone presses a button before it is ready
    const noFeedback = <div className="no-feedback">
        <div className="no-feedback-inner">
            <div className="no-feedback-icon"><Icon name="no-suggestions"/></div>
            <h2>There is no feedback yet.</h2>
            <p className="no-feedback-body">Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
            <button className="custom-btn purple">+ Add Feedback</button>
        </div>
    </div>

    return (
        <div className="suggestions">
            { header }

            { isFetching
                ? <h2>Fetching data...</h2>
                : data.length == 0
                    ? noFeedback
                    : <SuggestionList sortType={sort} items={data} upvote={ upvote } />
            }
        </div>
    )
}

export default Suggestions