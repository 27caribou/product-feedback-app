import '../style/roadmap.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Icon from "./Icon";

const RoadmapPage = () => {

    const [ data, setData ] = useState({})

    const processData = (items) => {
        let statuses = { 'Planned': [], 'In-Progress': [], 'Live': [] }

        items.forEach( item => {
            if ( item.status == 'planned' ) {
                statuses['Planned'].push(item)

            } else if ( item.status == 'in-progress' ) {
                statuses['In-Progress'].push(item)

            } else if ( item.status == 'live' ) {
                statuses['Live'].push(item)
            }
        })

        setData(statuses)
    }

    // Fetch data from json
    useEffect(() => {
        const abortCont = new AbortController(); // Used to stop the fetch if it is done while switching to another page

        fetch('http://localhost:8000/productRequests', { signal: abortCont.signal })
            .then(res => {
                return res.json()
            })
            .then(data => {
                processData(data)
            })
            .catch(err => {
                if ( err.name == 'AbortError' ){
                    console.log('Fetch aborted')
                }
                console.log(err)
            })

        return () => abortCont.abort()
    }, [])

    const header = <div className="roadmap-header">
        <div>
            <Link to="/">
                <button className="custom-btn return"><span>Go Back</span></button>
            </Link>
            <h3>Roadmap</h3>
        </div>
        <div>
            <Link to="/new-feedback">
                <button className="custom-btn purple">+ Add Feedback</button>
            </Link>
        </div>
    </div>

    return (
        <div id="roadmap-page">
            { header }

            <div className="request-groups">
                { Object.keys(data).map( status =>
                    <div key={status} className={`${status}-status ${ status == "Planned" ? "orange" : (status == "Live" ? "blue" : "purple") }`}>
                        <h4>{`${status} (${data[status].length})`}</h4>
                        <p>{
                            status == "Planned"
                                ? "Ideas prioritized for research"
                                : (status == "Live"
                                    ? "Released features"
                                    : "Currently being developed"
                                )
                        }</p>
                        <div className="requests">
                            { data[status].map( (request, index) =>
                                <div key={index} className="card request">
                                    <div className="header"><ul><li>{status}</li></ul></div>
                                    <h4>{request.title}</h4>
                                    <p>{request.description}</p>
                                    <span className="elem">{request.category}</span>
                                    <div className="buttons">
                                    <span className="elem votes">
                                        <Icon name="arrow-up"/>
                                        <span>{request.upvotes}</span>
                                    </span>
                                        <span className="comments">
                                        <Link to={""}>
                                            <Icon name="comments"/>
                                            <span>{ request.comments != null ? request.comments.length : 0 }</span>
                                        </Link>
                                    </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RoadmapPage