import "../styles/suggestions.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRequests } from "../Server";
import { countComments, processText } from "../Helpers";
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
            data.forEach( item => {
                if ( item.status == "suggestion" ) return

                if ( stats[item.status] == null ){
                    stats[item.status] = 1
                } else {
                    stats[item.status] += 1
                }
            })
            setRoadmapStats(stats)
            setData(data)

            // Remove loader
            document.querySelector(".loader-wrapper").classList.add("hide")
            setTimeout(() => {
                setState("ready")
            }, 450)
        })
    }, [])

    const upvoteSuggestion = (id) => {
        for ( let item of data ) {
            if ( item.id == id ) {
                item.upvotes += 1
                break;
            }
        }
        setData([ ...data ])
    }

    const getData = () => {
        // Filter by category
        let processed = data.filter( item => {
            if ( item.status != "suggestion" ) return false

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
    const titleCard = <div className="card title">
        <h3>Frontend Mentor</h3>
        <p>Feedback Board</p>
    </div>

    const categories = <div className="card categories">
        { ["all", "ui", "ux", "enhancement", "bug", "feature"].map( item =>
            <div key={item} className={`elem${ category == item ? " active" : ""}`} onClick={ () => setCategory(item) }>
                {processText(item)}
            </div>
        )}
    </div>

    const roadmap = <div className="card roadmap">
        <div className="header">
            <h4>Roadmap</h4>
            <Link to="/roadmap">View</Link>
        </div>
        <div className="list">
            <ul>
                { Object.keys(roadmapStats).map( key =>
                    <li key={key}><div>{processText(key)} <span className="count">{roadmapStats[key]}</span></div></li>
                ) }
            </ul>
        </div>
    </div>

    const sidebar = <section className="sidebar">
        {titleCard}
        {categories}
        {roadmap}
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
        <button className="custom-btn purple">+ Add Feedback</button>
    </div>

    const suggestionList = <div className="suggestions">
        { suggestions.map( item =>
            <SuggestionItem key={`${item.id}, ${item.upvotes}`} item={ item } upvote={ upvoteSuggestion } />
        ) }
    </div>

    const mainbar = <section className="mainbar">
        {mainbarHeader}
        {suggestionList}
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