import "../styles/suggestions.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRequests, updateRequest } from "../Server";
import { countComments, capitalize } from "../Helpers";
import Icon from "./components/Icon";
import CustomSelect from "./components/CustomSelect";
import SuggestionItem from "./components/SuggestionItem";

const SuggestionsPage = () => {

    // Show loader until fetch is done
    const [ state, setState ] = useState("fetching")
    const [ data, setData ] = useState([])
    const [ sorting, setSorting ] = useState("Most Upvotes")
    const [ category, setCategory ] = useState("all")
    const [ roadmapStats, setRoadmapStats ] = useState({})

    useEffect(() => {
        getRequests().then( data => {

            let stats = {}
            let suggestions = []
            data.forEach( item => {
                if ( item.status == "suggestion" ) {
                    suggestions.push(item)
                }
                else if ( stats[item.status] == null ){
                    stats[item.status] = 1
                } else {
                    stats[item.status] += 1
                }
            })
            setRoadmapStats(stats)
            setData(suggestions)

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

    const upvoteSuggestion = (id) => {
        let req
        for ( let item of data ) {
            if ( item.id == id ) {
                req = item
                break;
            }
        }

        setState("updating")
        updateRequest(id, { upvotes: req.upvotes + 1 }).then(() => {
            req.upvotes += 1
            setData([ ...data ])
            setState("ready")
        })
    }

    const getData = () => {
        // Filter by category
        let processed = data.filter( item => {

            if ( category == "all" )
                return true
            else return item.category == category
        })

        // Sort by option
        if ( sorting == "Most Upvotes" ){
            processed.sort( (a, b) => b.upvotes - a.upvotes )
        } else if ( sorting == "Least Upvotes" ){
            processed.sort( (a, b) => a.upvotes - b.upvotes )
        } else if ( sorting == "Most Comments" ){
            processed.sort( (a, b) => countComments(b) - countComments(a))
        } else {
            processed.sort( (a, b) => countComments(a) - countComments(b))
        }

        return processed
    }

    // SIDEBAR SECTION
    const titleCard = <div className="sidebar-card title">
        <div className="title-inner">
            <div>
                <h2>Frontend Mentor</h2>
                <p>Feedback Board</p>
            </div>
            <div className="hamburger" onClick={ e => {
                e.target.closest(".hamburger").classList.toggle("active")

                document.querySelector(".sidebar-inner").classList.toggle("show")
                document.querySelector(".title").classList.toggle("active")
                document.querySelector(".mainbar").classList.toggle("active")
            } }>
                <div className="bar top"></div>
                <div className="bar mid"></div>
                <div className="bar bottom"></div>
            </div>
        </div>
    </div>

    const categories = <div className="sidebar-card categories">
        { ["all", "ui", "ux", "enhancement", "bug", "feature"].map( item =>
            <div key={item} className={`elem${ category == item ? " active" : ""}`} onClick={ () => setCategory(item) }>
                {capitalize(item)}
            </div>
        )}
    </div>

    const roadmap = <div className="sidebar-card roadmap">
        <div className="header">
            <h4>Roadmap</h4>
            <Link to="/roadmap">View</Link>
        </div>
        <div className="list">
            <ul>
                { Object.keys(roadmapStats).map( key =>
                    <li key={key}><div>{capitalize(key)} <span className="count">{roadmapStats[key]}</span></div></li>
                ) }
            </ul>
        </div>
    </div>

    const sidebar = <section className="sidebar">
        {titleCard}
        <div className="sidebar-inner">
            <div className="cards">
                {categories}
                {roadmap}
            </div>
        </div>
    </section>

    // MAINBAR SECTION
    let suggestions = getData()

    const mainbarHeader = <div className="card header">
        <div>
            <span className="suggestions-number">
                <Icon name="suggestions"/>
                <span>{suggestions.length} Suggestions</span>
            </span>
            <span className="sort">
                <span>Sort by :</span>
                <CustomSelect
                    update={ option => setSorting(option) }
                    options={[ "Most Upvotes", "Least Upvotes", "Most Comments", "Least Comments" ]}
                />
            </span>
        </div>
        <Link to="/new-feedback"><button className="custom-btn purple">+ Add Feedback</button></Link>
    </div>

    const suggestionList = <div className="suggestions">
        { suggestions.map( item =>
            <SuggestionItem
                key={`${item.id}, ${item.upvotes}`} item={item} upvote={upvoteSuggestion}
                canUpvote={ state == "ready" } canRedirect={true}
            />
        ) }
    </div>

    const noSuggestions = <div className="card no-feedback">
        <Icon name="no-suggestions"/>
        <h2>There is no feedback yet.</h2>
        <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
        <Link to="/new-feedback"><button className="custom-btn purple">+ Add Feedback</button></Link>
    </div>

    const mainbar = <section className="mainbar">
        {mainbarHeader}
        { data.length > 0 ? suggestionList : noSuggestions }
    </section>


    const content = <div className="content">
        {sidebar}
        {mainbar}
    </div>

    return <div id="suggestions-page">
        { state == "fetching" ? <div className="loader-wrapper"><div className="loader"></div></div> : content }
    </div>
}

export default SuggestionsPage