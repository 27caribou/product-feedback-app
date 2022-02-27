import { useState } from "react";
import Icon from "./Icon";
import SortSelect from "./SortSelect";
import SuggestionList from "./SuggestionList";

const Suggestions = ({ tag, data, isFetching }) => {

    const [ sort, setSort ] = useState( 'Most upvotes' )

    const header = <div className="card suggestion-header">
        <span className="icon">
            <Icon name="suggestions"/>
        </span>
        <span className='suggestions-number'>{data.length} Suggestions</span>
        <span>
            <SortSelect
                type='dark'
                initial={ 'Most upvotes' }
                options={[ 'Most upvotes', 'Least upvotes', 'Most comments', 'Least comments' ]}
                update={ i => setSort(i) }
            />
        </span>
        <button className="custom-btn purple">+ Add Feedback</button>
    </div>

    const noFeedback = <div className="no-feedback">
        <span>image</span>
        <h4>There is no feedback yet.</h4>
        <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
        <button>+ Add Feedback</button>
    </div>

    return (
        <div className="suggestions">
            { header }

            { isFetching
                ? <h2>Fetching data...</h2>
                : <SuggestionList sortType={sort} items={data} />
            }
        </div>
    )
}

export default Suggestions