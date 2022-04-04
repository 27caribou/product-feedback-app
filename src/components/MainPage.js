import '../style/index.css';
import { useState, useEffect } from "react";

import Sidebar from "./Sidebar";
import Suggestions from "./Suggestions";

const MainPage = () => {

    const [ isFetching, setFetching ] = useState(true) // While waiting to get json data
    const [ tag, setTag ] = useState('All') // Used for filtering data by category
    const [ roadmapNumbers, setRoadmapNumbers ] = useState({ planned: 0, inProgress: 0, live: 0 })
    const [ data, setData ] = useState([]) // Raw data
    const [ filteredData, setFilteredData ] = useState([]) // Data after filtering by category

    const processData = ( data ) => {
        let suggestions = []
        let numbers = { planned: 0, inProgress: 0, live: 0 }

        data.forEach( request => {
            if ( request.status == 'suggestion' ){
                suggestions.push(request)
            } else if ( request.status == 'planned' ){
                numbers.planned += 1
            } else if ( request.status == 'in-progress' ){
                numbers.inProgress += 1
            } else {
                numbers.live += 1
            }
        })

        setData(suggestions)
        // At the beginning it is 'All', so no need to filter
        setFilteredData(suggestions)
        // setData([]); setFilteredData([]); setRoadmapNumbers({ planned: 0, inProgress: 0, live: 0 })
        setFetching(false)
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

    // Filter data on change
    useEffect(() => {
        setFilteredData( oldData => {
            const result = data.filter( item => {
                if ( tag == 'All' )
                    return true
                else return item.category == tag.toLowerCase()
            })
            return result
        })
    }, [tag])

    const upvote = (req) => {
        let index = data.indexOf(req)
        data[index].upvotes += 1
        setData([...data])
    }

    return (
        <div id="suggestions-page">
            <Sidebar current={ tag } chooseTag={ i => setTag(i) } roadmapNumbers={ roadmapNumbers }/>
            <Suggestions data={ filteredData } isFetching={ isFetching } upvote={ upvote }/>
        </div>
    )
}

export default MainPage