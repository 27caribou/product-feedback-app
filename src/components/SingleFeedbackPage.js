import '../style/feedback-page.css';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "./Icon";
import Comment from "./Comment";
import ReplyForm from "./ReplyForm";

const SingleFeedbackPage = () => {

    const [ data, setData ] = useState({}) // Raw data
    const [ currentUser, setCurrentUser ] = useState({})
    const { id } = useParams()
    // console.log(data)

    // Fetch data from json
    useEffect(() => {
        const abortCont = new AbortController(); // Used to stop the fetch if it is done while switching to another page

        fetch('http://localhost:8000/productRequests/' + id,{ signal: abortCont.signal })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setData(data)
            })
            .catch(err => {
                if ( err.name == 'AbortError' ){
                    console.log('Fetch aborted')
                }
                console.log(err)
            })

        fetch('http://localhost:8000/currentUser',{ signal: abortCont.signal })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setCurrentUser(data)
            })
            .catch(err => {
                if ( err.name == 'AbortError' ){
                    console.log('Fetch aborted')
                }
                console.log(err)
            })

        return () => abortCont.abort()
    }, [])

    const postComment = (content, info) => {
        setData( oldData => {
            let comments = [ ...oldData.comments ]

            if ( info.type == "comment" ){
                comments.push({
                    id: comments[ comments.length - 1 ].id + 1,
                    content: content,
                    user: currentUser
                })

            } else {
                console.log(info)
                for ( let i=0; i<comments.length; i++) {
                    if ( comments[i].id == info.commentId ){
                        let reply = {
                            content: content,
                            replyingTo: comments[i].user.username,
                            user: currentUser
                        }

                        if ( info.reply != null ){
                            comments[i].replies.splice(
                                info.reply + 1,
                                0,
                                reply
                            )
                            console.log(comments[i].replies)

                        } else {

                            if ( comments[i].replies ) {
                                comments[i].replies.unshift(reply)
                            } else {
                                comments[i].replies = [ reply ]
                            }
                        }

                        break;
                    }
                }
            }

            return { ...oldData, comments: comments }
        })
    }

    return (
        <div id="feedback-page">

            <div className="links">
                <Link to="/">
                    <button className="custom-btn return-outline"><span>Go Back</span></button>
                </Link>
                <Link to={`/edit-feedback/${id}`}>
                    <button className="custom-btn blue">Edit Feedback</button>
                </Link>
            </div>

            <div className="feedback-info">
                <div className="card feedback">
                    <span className="elem votes" onClick={ () => setData({ ...data, upvotes: data.upvotes+1 }) }>
                        <Icon name="arrow-up"/>
                        <span>{ data.upvotes }</span>
                    </span>
                    <div className="description">
                        <h3>{ data.title }</h3>
                        <p>{ data.description }</p>
                        <span className="elem">{ data.category }</span>
                    </div>
                    <span className="comments">
                        <Icon name="comments"/>
                        <span>{ data.comments != null ? data.comments.length : 0 }</span>
                    </span>
                </div>
            </div>

            <div className="card feedback-comment-list">
                <h3>XX Comments</h3>
                { data.comments != null && data.comments.map( itemData =>
                    <Comment key={itemData.id} data={itemData} post={ postComment } />
                )}
            </div>

            <div className="card new-comment-form">
                <h3>Add Comment</h3>
                <ReplyForm type="comment" showCount={true} post={ content => postComment(content, { type: "comment" }) } />
            </div>
        </div>
    )
}

export default SingleFeedbackPage