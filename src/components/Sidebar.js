import {Link} from "react-router-dom";

const Sidebar = ({ current, chooseTag, roadmapNumbers, openMap }) => {

    const home = <div className="card board-name">
        <h3>Frontend Mentor</h3>
        <p>Feedback Board</p>
    </div>

    const tagNames = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature']
    const tags = <div className="card tag-list">
        { tagNames.map(tag => (
            <span key={ JSON.stringify(tag) } className={ tag != current ? 'elem' : 'elem active' } onClick={ () => chooseTag(tag) }>{ tag }</span>
        ))}
    </div>

    const roadmap = <div className="card roadmap-sidebar">
        <div className="header">
            <h3>Roadmap</h3>
            <span><Link to="/roadmap">View</Link></span>
        </div>
        <div className="list">
            <ul>
                <li><div>Planned <span className="count">{roadmapNumbers.planned}</span></div></li>
                <li><div>In-Progress <span className="count">{roadmapNumbers.inProgress}</span></div></li>
                <li><div>Live <span className="count">{roadmapNumbers.live}</span></div></li>
            </ul>
        </div>
    </div>

    return (
        <div className='sidebar'>
            { home }
            { tags }
            { roadmap }
        </div>
    )
}
export default Sidebar