import "../styles/feedback.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRequest, getUserdata, updateRequest } from "../APICalls";
import SuggestionItem from "./components/SuggestionItem";
import { countComments } from "../Helpers";
import Comment from "./components/Comment";


const FeedbackPage = () => {

    const [ state, setState ] = useState("fetching")
    const [ user, setUser ] = useState({})
    const [ feedback, setFeedback ] = useState({})
    const [ newComment, setNewComment ] = useState("")
    const { id } = useParams()

    useEffect(() => {
        getUserdata().then( data => setUser(data) )

        getRequest(id).then(data => {
            setFeedback(data)

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

    const upvoteSuggestion = () => {
        setState("updating")
        updateRequest(id, { upvotes: feedback.upvotes + 1 }).then(() => {
            feedback.upvotes += 1
            setFeedback({ ...feedback })
            setState("ready")
        })
    }

    const postComment = () => {
        setState("updating")
        let commentList
        if ( feedback.comments == null ){
            commentList = [{ content: newComment, user: user }]
        } else {
            commentList = [ ...feedback.comments, { content: newComment, user: user } ]
        }
        updateRequest(id, { comments: commentList }).then(() => {
            feedback.comments = commentList
            setFeedback({ ...feedback })
            setState("ready")
            setNewComment("")
        })
    }

    const postReply = ( reply, commentIndex, replyIndex = -1 ) => {
        setState("updating")

        let replyObj = { content: reply, user: user }
        let comment = feedback.comments[commentIndex]
        if ( replyIndex != -1 ) {
            replyObj["replyingTo"] = feedback.comments[commentIndex].replies[replyIndex].user.username
        } else {
            replyObj["replyingTo"] = feedback.comments[commentIndex].user.username
        }

        if ( replyIndex != -1 ) {
            comment.replies.splice( replyIndex + 1, 0, replyObj )
        } else if ( feedback.comments[commentIndex].replies != null ){
            comment.replies.push( replyObj )
        } else {
            comment.replies = [ replyObj ]
        }

        let commentList = [ ...feedback.comments ]
        updateRequest(id, { comments: commentList }).then(() => {
            feedback.comments = commentList
            setFeedback({ ...feedback })
            setState("ready")
        })
    }

    const links = <div className="links">
        <Link to={ feedback.status == "suggestion" ? "/" : "/roadmap" }>
            <button className="custom-btn return outline">Go Back</button>
        </Link>
        <Link to={`/edit-feedback/${id}`}>
            <button className="custom-btn blue">Edit Feedback</button>
        </Link>
    </div>

    const comments = <div className="card comments">
        <h3>{countComments(feedback)} Comments</h3>
        { feedback.comments != null && feedback.comments.map( (comment, index) =>
            <Comment key={index} data={comment} postReply={ (reply, replyIndex) => postReply(reply, index, replyIndex) }/>
        ) }
    </div>

    const replyForm = <div className="card post-comment">
        <h3>Add Comment</h3>
        <textarea
            placeholder="Type your comment here" maxLength={250} rows={3}
            value={newComment} onChange={ e => setNewComment(e.target.value) }
        ></textarea>
        <div>
            <span>{250-newComment.length} characters left</span>
            <button
                className="custom-btn purple" onClick={postComment}
                disabled={ newComment.length == 0 || state == "updating" }
            >Post Comment</button>
        </div>
    </div>

    const content = <div className="content">
        {links}
        <SuggestionItem item={feedback} upvote={upvoteSuggestion} canUpvote={ state == "ready" } />
        {comments}
        {replyForm}
    </div>

    return <div id="feedback-page">
        { state == "fetching" ? <div className="loader-wrapper"><div className="loader"></div></div> : content }
    </div>
}

export default FeedbackPage