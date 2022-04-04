import { Link } from "react-router-dom";
import SortSelect from "./SortSelect";

const FeedbackForm = () => {

    return (
        <div id="new-feedback-page">
            <div className="links">
                <Link to="/">
                    <button className="custom-btn return-outline"><span>Go Back</span></button>
                </Link>
                {/*<Link to="/comments">*/}
                {/*    <button className="custom-btn blue">Edit Feedback</button>*/}
                {/*</Link>*/}
            </div>
            <div className="card feedback-form">
                <h2>Create New Feedback</h2>
                <form>
                    <div className="field">
                        <label htmlFor="feedback-title">Feedback Title</label>
                        <p>Add a short, descriptive headline</p>
                        <input type="text" id="feedback-title"/>
                    </div>
                    <div className="field">
                        <label htmlFor="feedback-category">Category</label>
                        <p>Choose a category for your feedback</p>
                        {/*<input type="text" id="feedback-c"/>*/}
                        <SortSelect
                            // type='dark'
                            initial={ 'Feature' }
                            options={[ 'Feature', 'UI', 'UX', 'Enhancement', 'Bug' ]}
                            update={ i => console.log(i) }
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="feedback-detail">Feedback Detail</label>
                        <p>Include any specific comments on what shouild be improved, added, etc.</p>
                        <textarea id="feedback-detail"></textarea>
                    </div>
                </form>
                <div className="action-buttons">
                    <button className="custom-btn dark">Cancel</button>
                    <button className="custom-btn purple">Add Feedback</button>
                </div>
            </div>
        </div>
    )
}

export default FeedbackForm