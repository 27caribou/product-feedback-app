import { useState } from "react";

const Comment = ({ data, isReply = false, postReply }) => {

    const [ showReplyForm, setShowReplyForm ] = useState(false)
    const [ reply, setReply ] = useState("")

    const replyForm = <div className="reply-form">
        <div>
            <textarea
                placeholder="Type your comment here" maxLength={250}
                onChange={ e => setReply(e.target.value) }
            ></textarea>
            <button
                className="custom-btn purple"
                onClick={ () => {
                    postReply(reply)
                    setShowReplyForm(false)
                    setReply("")
                } } disabled={ reply.length == 0 }
            >Post Reply</button>
        </div>
    </div>

    return (
        <div className={`feedback-comment${ isReply ? " is-reply" : "" }`}>
            <div className="header">
                <div className="col">
                    <div className="profile-pic">
                        <img src={ require(`../../images/user-images/${data.user.image}`) } />
                    </div>
                </div>
                <div className="col">
                    <div className="names">
                        <h4>{data.user.name}</h4>
                        <p>@{data.user.username}</p>
                    </div>
                </div>
                <div className="col">
                    <div className="reply">
                        <a onClick={() => setShowReplyForm(!showReplyForm)}>Reply</a>
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="description">
                    <div>
                        <p>
                            { isReply && <span className="replying-to">@{data.replyingTo}</span> }
                            {data.content}
                        </p>
                    </div>
                </div>
                { showReplyForm && replyForm }
                { data.replies != null && <div className="replies">
                    <div>
                        { data.replies.map( (reply, index) =>
                            <Comment key={reply.content} data={reply} isReply={true} postReply={ reply => postReply(reply, index)}/>
                        ) }
                    </div>
                </div> }
            </div>
        </div>
    )
}

export default Comment
