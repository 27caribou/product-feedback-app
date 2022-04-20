import "../styles/feedback.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRequest, getUserdata } from "../Server";
import SuggestionItem from "./components/SuggestionItem";
import {countComments} from "../Helpers";


const FeedbackPage = () => {

    const [ state, setState ] = useState("fetching")
    const [ feedback, setFeedback ] = useState({})
    const { id } = useParams()
    let userData = {}

    useEffect(() => {
        getUserdata().then( data => userData = data )

        getRequest(id).then(data => {
            setFeedback(data)

            // Remove loader
            document.querySelector(".loader-wrapper").classList.add("hide")
            setTimeout(() => {
                setState("ready")
            }, 450)
        })
    }, [])

    const upvoteSuggestion = (id) => {
        console.log("Upvoting " + id)
    }

    const links = <div className="links">
        <Link to="/">
            <button className="custom-btn return outline">Go Back</button>
        </Link>
        <Link to={`/edit-feedback/${id}`}>
            <button className="custom-btn blue">Edit Feedback</button>
        </Link>
    </div>

    const renderComment = (comment) => (
        <div className="feedback-comment">

        </div>
    )

    const comments = <div className="card comments">
        <h3>{countComments(feedback)} Comments</h3>
    </div>

    const content = <div className="content">
        {links}
        <SuggestionItem item={feedback} upvote={upvoteSuggestion} canUpvote={ state == "ready" } />
        {comments}
    </div>

    return <div id="feedback-page">
        { state == "fetching" ? <div className="loader-wrapper"><div className="loader"></div></div> : content }
    </div>
}

export default FeedbackPage