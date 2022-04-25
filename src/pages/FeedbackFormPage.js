import "../styles/feedback-form.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {getRequest, getUserdata} from "../Server";

const FeedbackFormPage = () => {

    const [ state, setState ] = useState("fetching")

    // useEffect(() => {
        // Remove loader
        // document.querySelector(".loader-wrapper").classList.add("hide")
        // setTimeout(() => {
        //     setState("ready")
        // }, 450)
    // }, [])

    const form = <div className="card">
        <h3>Title</h3>
    </div>

    const content = <div className="content">
        {form}
    </div>

    return <div id="feedback-form-page">
        { state != "fetching" ? <div className="loader-wrapper"><div className="loader"></div></div> : content }
    </div>
}

export default FeedbackFormPage