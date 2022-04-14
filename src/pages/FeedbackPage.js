import { Link } from "react-router-dom";

const FeedbackPage = () => {

    return (
        <div>
            This is ONE feedback page
            <Link to="/">
                <button>Go Back</button>
            </Link>
        </div>
    )
}

export default FeedbackPage