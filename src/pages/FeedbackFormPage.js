import { Link } from "react-router-dom";

const FeedbackFormPage = () => {

    return (
        <div>
            This is the feedback form page
            <Link to="/">
                <button>Go Back</button>
            </Link>
        </div>
    )
}

export default FeedbackFormPage