import Icon from "./Icon";
import { countComments, processText } from "../../Helpers";

const SuggestionItem = ({ item, upvote }) => {

    return (
        <div className="card feedback">
            <div className="col">
                <div className="elem" onClick={ () => upvote(item.id)}>
                    <div className="votes">
                        <Icon name="arrow-up"/><span>{ item.upvotes }</span>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="feedback-body">
                    <h3>{ item.title }</h3>
                    <p>{ item.description }</p>
                    <div className="elem">{ processText(item.category) }</div>
                </div>
            </div>
            <div className="col">
                <div className={`comment-number ${countComments(item) == 0 ? " empty" : ""}`}>
                    <div>
                        <Icon name="comments"/>
                        <span>{countComments(item)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestionItem
