import '../style/new-feedback.css';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SortSelect from "./SortSelect";

// In-Progress
Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

const FeedbackForm = () => {

    const [ title, setTitle ] = useState("")
    const [ titleIsEmpty, setTitleIsEmpty ] = useState(false)
    const [ category, setCategory ] = useState("Feature")
    const [ detail, setDetail ] = useState("")
    const [ detailIsEmpty, setDetailIsEmpty ] = useState(false)

    const { id } = useParams()
    const [ status, setStatus ] = useState("Suggestion")

    console.log(detail)

    // Fetch data from json
    useEffect(() => {
        if ( id == null ) return

        const abortCont = new AbortController(); // Used to stop the fetch if it is done while switching to another page

        fetch('http://localhost:8000/productRequests/' + id,{ signal: abortCont.signal })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                setTitle(data.title)
                setCategory(data.category.capitalize())
                setDetail(data.description)
            })
            .catch(err => {
                if ( err.name == 'AbortError' ){
                    console.log('Fetch aborted')
                }
                console.log(err)
            })

        return () => abortCont.abort()
    }, [])

    const createFeedback = () => {
        if ( title.length == 0 ){
            setTitleIsEmpty(true)
        }
        if ( detail.length == 0 ){
            setDetailIsEmpty(true)
        }

        if ( title.length != 0 && detail.length != 0 ){
            console.log('ready')
        }
    }

    return (
        <div id="new-feedback-page">
            <div className="links">
                <Link to={ id == null ? "/" : `/feedback/${id}` }>
                    <button className="custom-btn return-outline"><span>Go Back</span></button>
                </Link>
            </div>
            <div className="card feedback-form">
                <h2>{ id == null ? "Create New Feedback" : `Editing '${title}'`}</h2>
                <form>
                    <div className="field">
                        <label htmlFor="feedback-title">Feedback Title</label>
                        <p>Add a short, descriptive headline</p>
                        <input
                            type="text" id="feedback-title"
                            className={ titleIsEmpty ? "error" : ""}
                            value={ title }
                            onChange={ e => {
                                setTitleIsEmpty(false)
                                setTitle(e.target.value)
                            } }
                        />
                        { titleIsEmpty ? <span className="error-message">Can't be empty</span> : "" }
                    </div>
                    <div className="field">
                        <label htmlFor="feedback-category">Category</label>
                        <p>Choose a category for your feedback</p>
                        <SortSelect
                            initial={ category }
                            options={[ 'Feature', 'UI', 'UX', 'Enhancement', 'Bug' ]}
                            update={ i => setCategory(i) }
                        />
                    </div>
                    { id != null && <div className="field">
                        <label htmlFor="feedback-status">Update status</label>
                        <p>Change feature state</p>
                        <SortSelect
                            initial={ status }
                            options={[ 'Suggestion', 'Planned', 'In-Progress', 'Live' ]}
                            update={i => setStatus(i)}
                        />
                    </div> }
                    <div className="field">
                        <label htmlFor="feedback-detail">Feedback Detail</label>
                        <p>Include any specific comments on what shouild be improved, added, etc.</p>
                        <textarea
                            id="feedback-detail"
                            className={ detailIsEmpty ? "error" : ""}
                            value={ detail }
                            onChange={ e => {
                                setDetailIsEmpty(false)
                                setDetail(e.target.value)
                            } }
                        ></textarea>
                        { detailIsEmpty ? <span className="error-message">Can't be empty</span> : "" }
                    </div>
                </form>
                <div className="action-buttons">
                    <div className="button-group">
                        <Link to={ id == null ? "/" : `/feedback/${id}` }>
                            <button className="custom-btn dark">Cancel</button>
                        </Link>
                        <button className="custom-btn purple" onClick={ createFeedback }>
                            { id == null ? "Add Feeback" : "Save Changes" }
                        </button>
                    </div>
                    { id != null && <div className="button-group">
                        <button className="custom-btn red">Delete</button>
                    </div> }
                </div>
            </div>
        </div>
    )
}

export default FeedbackForm