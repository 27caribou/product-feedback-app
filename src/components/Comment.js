import { useState } from "react";
import ReplyForm from "./ReplyForm";

const Comment = ({ data, post, parents }) => {

    const [ showReplyForm, setShowReplyForm ] = useState(false)

    const renderComment = (comment) => (
        <div className={ comment.replyingTo == null ? "feedback-comment main" : "feedback-comment"}>
            <div className="header">
                <span className="profile">
                    <img src={ require("../images/user-images/" + comment.user.image)} />
                </span>
                <div>
                    <div className="names">
                        <h4>{ comment.user.name }</h4>
                        <p className="body-2">@{ comment.user.username }</p>
                    </div>
                    <div className="reply">
                        <a onClick={ () => setShowReplyForm(!showReplyForm) }>Reply</a>
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="description">
                    <span className="body-2">
                        {comment.replyingTo != null ? <span className="reply-to">@{comment.replyingTo}</span> : ""}
                        {comment.content}
                    </span>
                    { showReplyForm && <ReplyForm type="reply" post={ content => {
                        let info = {
                            type: "reply",
                            commentId: comment.id ? comment.id : parents[0],
                        }
                        if ( !comment.id ) {
                            info.reply = parents[1]
                        }

                        post(content, info)
                        setShowReplyForm(false)
                    } }/> }
                    { comment.replies != null &&
                        <div className="comments">
                            { comment.replies.map( (reply, index) =>
                                <Comment key={index} data={reply} post={ post } parents={[ comment.id, index ]}/>
                            ) }
                        </div>
                    }
                </div>
            </div>
        </div>
    )

    return (
        <>
            { renderComment(data) }
        </>
    )
}

export default Comment