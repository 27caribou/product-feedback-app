import '../style/new-feedback.css';
import { useState } from "react";

const ReplyForm = ({ type, showCount, post }) => {

    if ( type == null ) return <></>

    const [ content, setContent ] = useState("")

    return (
        <div className={ showCount ? "reply-form has-count" : "reply-form" }>
            <form action="">
                <textarea
                    placeholder={`Type your ${type} here`}
                    maxLength={250}
                    value={content}
                    onChange={ e => setContent(e.target.value) }
                ></textarea>
            </form>
            <div>
                { showCount && <span>{250 - content.length} Characters left</span> }
                <button className="custom-btn purple" onClick={ () => {
                    post(content)
                    setContent("")
                } }>Post { type == "comment" ? "Comment" : "Reply"}</button>
            </div>
        </div>
    )
}

export default ReplyForm