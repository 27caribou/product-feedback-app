import "../styles/roadmap.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {getRequests, updateRequest} from "../APICalls";
import { capitalize, countComments } from "../Helpers";
import Icon from "./components/Icon";

const RoadmapPage = () => {

    const [ state, setState ] = useState("fetching")
    const [ data, setData ] = useState({})
    const [ currentStatus, setCurrentStatus ] = useState('in-progress')

    useEffect(() => {
        getRequests().then( data => {
            let statuses = { "planned": [], "in-progress": [], "live": [] }

            data.forEach( item => {
                if ( item.status == "suggestion" ) return
                statuses[ item.status ].push(item)
            })
            setData(statuses)

            // Remove loader
            let loader = document.querySelector(".loader-wrapper")
            if ( loader != null ){
                loader.classList.add("hide")
                setTimeout(() => {
                    setState("ready")
                }, 450)
            }
        })
    }, [])

    const upvote = (id, status) => {
        let req
        for ( let item of data[status] ) {
            if ( item.id == id ) {
                req = item
                break;
            }
        }

        setState("updating")
        updateRequest(id, { upvotes: req.upvotes + 1 }).then(() => {
            req.upvotes += 1
            setData({ ...data })
            setState("ready")
        })
    }

    const header = <div className="roadmap-header">
        <div>
            <Link to="/">
                <button className="custom-btn return outline">Go Back</button>
            </Link>
            <h1>Roadmap</h1>
        </div>
        <div>
            <Link to="/new-feedback">
                <button className="custom-btn purple">+ Add Feedback</button>
            </Link>
        </div>
    </div>

    const renderItem = (item, status) => (
        <div key={item.id} className="card request">
            <div className="header"><ul><li>{capitalize(status)}</li></ul></div>
            <h4><Link to={`/feedback/${item.id}`}>{ item.title }</Link></h4>
            <div className="body">
                <p>{item.description}</p>
                <span className="elem">{capitalize(item.category)}</span>
            </div>
            <div className="buttons">
                <div className={`elem${ state == "ready" ? "" : " disabled" }`} onClick={ () => upvote(item.id, status) }>
                    <div className="votes">
                        <Icon name="arrow-up"/><span>{item.upvotes}</span>
                    </div>
                </div>
                <div className={`comment-number ${countComments(item) == 0 ? " empty" : ""}`}>
                    <div>
                        <Icon name="comments"/>
                        <span>{countComments(item)}</span>
                    </div>
                </div>
            </div>
        </div>
    )

    const changeStatus = (e, status) => {
        let container = e.target.parentElement
        let prevSelected = container.querySelector(".option.selected")

        if ( prevSelected != e.target ){
            prevSelected.classList.remove("selected")
            e.target.classList.add("selected")
            setCurrentStatus(status)
        }
    }

    const statusSelect = <div className="status-options">
        { Object.keys(data).map( status =>
            <div key={status} className={`option${ currentStatus == status ? " selected" : "" }`} onClick={ e => changeStatus(e, status) }>
                {capitalize(status)} ({data[status].length})
            </div>
        ) }
    </div>


    const content = <>
        <div className="content">
            {header}
            {statusSelect}
            <div className="request-groups">
                { Object.keys(data).map( status =>
                    <div key={status} className={`${status}-status${ currentStatus == status ? " show" : "" }`}>
                        <h4>{`${capitalize(status)} (${data[status].length})`}</h4>
                        <p>{
                            status == "planned"
                                ? "Ideas prioritized for research"
                                : (status == "live"
                                        ? "Released features"
                                        : "Currently being developed"
                                )
                        }</p>
                        <div className="requests">
                            { data[status].map( request => renderItem(request, status) )}
                        </div>
                    </div>
                ) }
            </div>
        </div>
        <div className="credit">© 2022 Teddy N'go</div>
    </>

    return <div id="roadmap-page">
        { state == "fetching" ? <div className="loader-wrapper"><div className="loader"></div></div> : content }
    </div>
}

export default RoadmapPage