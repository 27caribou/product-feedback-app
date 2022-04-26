import "../styles/feedback-form.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomSelect from "./components/CustomSelect";
import Icon from "./components/Icon";
import { postRequest } from "../Server";

const FeedbackFormPage = () => {

    const [ state, setState ] = useState("ready")
    const [ title, setTitle ] = useState("")
    const [ category, setCategory ] = useState("Feature")
    const [ feedbackStatus, setFeedbackStatus ] = useState("Suggestion")
    const [ detail, setDetail ] = useState("")
    const [ hasEmptyField, setHasEmptyField ] = useState(false)
    const history = useHistory()

    const createFeedback = () => {
        if ( title.length == 0 || detail.length == 0 ){
            setHasEmptyField(true)
            return
        }

        let newFeedback = { title: title, category: category.toLowerCase(), upvotes: 0, status: "suggestion", description: detail }
        postRequest(newFeedback).then(data => {
            console.log(data)
            history.push("/")
        })
    }

    // useEffect(() => {
        // Remove loader
        // document.querySelector(".loader-wrapper").classList.add("hide")
        // setTimeout(() => {
        //     setState("ready")
        // }, 450)
    // }, [])

    const titleField = <div className="field">
        <label htmlFor="feedback-title">Feedback Title</label>
        <p>Add a short, descriptive headline</p>
        <input
            type="text" id="feedback-title" autoComplete="off"
            // className={ titleIsEmpty ? "error" : ""}
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
            value={ category } options={[ "Feature", "UI", "UX", "Enhancement", "Bug" ]}
            update={ option => setCategory(option) }
        />
    </div>

    const statusField = <div className="field">
        <label htmlFor="feedback-status">Update Status</label>
        <p>Change feature state</p>
        <CustomSelect
            value={feedbackStatus} options={[ "Planned", "In-Progress", "Live", "Suggestion" ]}
            update={ option => setFeedbackStatus(option) }
        />
    </div>

    const detailField = <div className="field">
        <label htmlFor="feedback-detail">Feedback Detail</label>
        <p>Include any specific comments on what should be improved, added, etc.</p>
        <textarea
            id="feedback-detail" rows={3}
            // className={ detailIsEmpty ? "error" : ""}
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
            <button className="custom-btn purple" onClick={createFeedback}>Add Feedback</button>
        </div>
        {/*<div>*/}
        {/*    <button className="custom-btn red">Delete</button>*/}
        {/*</div>*/}
    </div>

    const content = <div className="content">
        <Link to="/">
            <button className="custom-btn return outline">Go Back</button>
        </Link>
        <div className="card">
            <Icon name="new-feedback"/>
            <h1>Create New Feedback</h1>
            {titleField}
            {categoryField}
            {/*{statusField}*/}
            {detailField}
            {buttons}
        </div>
    </div>

    return <div id="feedback-form-page">
        { state == "fetching" ? <div className="loader-wrapper"><div className="loader"></div></div> : content }
    </div>
}

export default FeedbackFormPage