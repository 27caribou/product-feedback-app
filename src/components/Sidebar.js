
const Sidebar = ({ chooseTag }) => {

    const home = <div className="card board-name">
        <h3>Frontend Mentor</h3>
        <p>Feedback Board</p>
    </div>

    const tagNames = ['all', 'ui', 'ux', 'enhancements', 'bugs', 'feature']
    const tags = <div className="card tag-list">
        { tagNames.map(tag => (
            <span onClick={ () => chooseTag(tag) }>{ tag }</span>
        ))}
    </div>

    const roadmap = <div className="card roadmap-sidebar">
        <div className="header">
            <span>Roadmap</span>
            <span><a href="#">View</a></span>
        </div>
        <div>
            <span>Planned</span>
            <span>In-Progress</span>
            <span>Live</span>
        </div>
    </div>

    return (
        <div className='sidebar'>
            { home }
            <div>
                { tags }
                { roadmap }
            </div>
        </div>
    )
}
export default Sidebar