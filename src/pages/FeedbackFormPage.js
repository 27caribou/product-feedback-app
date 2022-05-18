import "../styles/feedback-form.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomSelect from "./components/CustomSelect";
import Icon from "./components/Icon";
import { deleteRequest, getRequest, postRequest, updateRequest } from "../APICalls";
import { capitalize } from "../Helpers";

const FeedbackFormPage = () => {

    const { id } = useParams()
    const history = useHistory()
    const [ state, setState ] = useState( id == null ? "ready" : "fetching" )

    const [ heading, setHeading ] = useState("Create New Feedback")
    const [ title, setTitle ] = useState("")
    const [ category, setCategory ] = useState("feature")
    const [ feedbackStatus, setFeedbackStatus ] = useState("suggestion")
    const [ detail, setDetail ] = useState("")
    const [ hasEmptyField, setHasEmptyField ] = useState(false)

    const createFeedback = () => {
        if ( title.length == 0 || detail.length == 0 ){
            setHasEmptyField(true)
            return
        }

        postRequest({
            title: title,
            category: category,
            upvotes: 0,
            status: feedbackStatus,
            description: detail
        }).then( resp => history.push("/") )
    }

    const deleteFeedback = () => {
        let canDelete = confirm("Are you sure you want to delete this?")
        if ( !canDelete ) return

        deleteRequest(id).then( resp => history.push("/") )
    }

    const updateFeedback = () => {
        if ( title.length == 0 || detail.length == 0 ){
            setHasEmptyField(true)
            return
        }

        updateRequest(id, {
            title: title,
            category: category,
            status: feedbackStatus,
            description: detail
        }).then( resp => history.push(`/feedback/${id}`) )
    }

    useEffect(() => {
        if ( id == null ) return

        getRequest(id).then(data => {
            setHeading(`Editing '${data.title}'`)
            setTitle(data.title)
            setCategory(data.category)
            setFeedbackStatus(data.status)
            setDetail(data.description)

            // Remove loader
            let loader = document.querySelector(".loader-wrapper")
            if ( loader != null ){
                loader.classList.add("hide")
                setTimeout(() => {
                    setState("ready")
                }, 450)
            }
        })
    }, [])

    const titleField = <div className="field">
        <label htmlFor="feedback-title">Feedback Title</label>
        <p>Add a short, descriptive headline</p>
        <input
            type="text" id="feedback-title" autoComplete="off"
            className={ hasEmptyField && title.length == 0 ? "error" : ""}
            value={ title }
            onChange={ e => {
                setHasEmptyField(false)
                setTitle(e.target.value)
            } }
        />
        { hasEmptyField && title.length == 0 ? <span className="error-message">Can't be empty</span> : "" }
    </div>

    const categoryField = <div className="field">
        <label htmlFor="feedback-category">Category</label>
        <p>Choose a category for your feedback</p>
        <CustomSelect
            value={ capitalize(category) } options={[ "Feature", "UI", "UX", "Enhancement", "Bug" ]}
            update={ option => setCategory(option.toLowerCase()) }
        />
    </div>

    const statusField = <div className="field">
        <label htmlFor="feedback-status">Update Status</label>
        <p>Change feature state</p>
        <CustomSelect
            value={ capitalize(feedbackStatus) } options={[ "Planned", "In-Progress", "Live", "Suggestion" ]}
            update={ option => setFeedbackStatus(option.toLowerCase()) }
        />
    </div>

    const detailField = <div className="field">
        <label htmlFor="feedback-detail">Feedback Detail</label>
        <p>Include any specific comments on what should be improved, added, etc.</p>
        <textarea
            id="feedback-detail" rows={3}
            className={ hasEmptyField && detail.length == 0 ? "error" : ""}
            value={ detail }
            onChange={ e => {
                setHasEmptyField(false)
                setDetail(e.target.value)
            } }
        ></textarea>
        { hasEmptyField && detail.length == 0 ? <span className="error-message">Can't be empty</span> : "" }
    </div>

    const buttons = <div className="buttons">
        <div>
            <Link to="/">
                <button className="custom-btn dark">Cancel</button>
            </Link>
            { id == null
                ? <button className="custom-btn purple" onClick={createFeedback}>Add Feedback</button>
                : <button className="custom-btn purple" onClick={updateFeedback}>Save Changes</button>
            }
        </div>
        { id != null && <div>
            <button className="custom-btn red" onClick={deleteFeedback}>Delete</button>
        </div> }
    </div>

    const content = <div className="content">
        <Link to={ id != null ? `/feedback/${id}` : "/" }>
            <button className="custom-btn return outline">Go Back</button>
        </Link>
        <div className="card">
            { id == null ? <Icon name="new-feedback"/> : <Icon name="edit-feedback"/> }
            <h1>{heading}</h1>
            {titleField}
            {categoryField}
            { id != null && statusField}
            {detailField}
            {buttons}
        </div>
    </div>

    return <div id="feedback-form-page">
        { state == "fetching" ? <div className="loader-wrapper"><div className="loader"></div></div> : content }
    </div>
}

export default FeedbackFormPage