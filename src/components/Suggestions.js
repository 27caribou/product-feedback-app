import { useState, useEffect } from "react";
import Icon from "./Icon";

const Suggestions = () => {
    const [ data, setData ] = useState( null )
    const [ pending, setPending ] = useState( true )

    useEffect(() => {
        fetch('http://localhost:8000/productRequests')
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                setData(data)
                setPending(false)
            })
    }, [])

    const header = <div className="card suggestion-header">
        <span>image</span>
        <span>6 Suggestions</span>
        <span>Sort by</span>
        <button className="custom-btn red">+ Add Feedback</button>
    </div>

    const noFeedback = <div className="no-feedback">
        <span>image</span>
        <h4>There is no feedback yet.</h4>
        <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
        <button>+ Add Feedback</button>
    </div>

    return (
        <div className='suggestion-list'>
            { pending && <h2>Fetching data...</h2> }
            { !pending && header }

            <Icon name={'edit-feedback'} />

            { !pending && data.map( item => (
                <div key={ JSON.stringify(item) } className="card feedback">
                    <button>{ item.upvotes }</button>
                    <span>{ item.title }</span>
                    <span>{ item.category }</span>
                    <span>{ item.comments != null ? item.comments.length : 0 } sms</span>
                </div>
            ))}
        </div>
    )
}
export default Suggestions