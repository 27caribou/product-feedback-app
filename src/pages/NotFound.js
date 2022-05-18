import "../styles/not-found.css";
import { Link } from "react-router-dom";
import Icon from "./components/Icon";

const NotFound = () => {
    return (
        <div id="not-found">
            <Icon name="page-not-found"/>
            <h1>Sorry (not sorry)</h1>
            <p>That page does not exist...</p>
            <Link to="/">Return to the homepage</Link>
        </div>
    )
}

export default NotFound