import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Suggestions from "./components/Suggestions";

function App() {

    const [ isFetching, setFetching ] = useState( true )
    const [ tag, setTag ] = useState('All')
    const [ roadmapNumbers, setRoadmapNumbers ] = useState({ planned: 0, inProgress: 0, live: 0 })
    const [ data, setData ] = useState( [] )

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
        setRoadmapNumbers(numbers)
        setFetching(false)
    }

    // Fetch data from json
    useEffect(() => {
        fetch('http://localhost:8000/productRequests')
            .then(res => {
                return res.json()
            })
            .then(data => {
                processData(data)
            })
    }, [])

    const openRoadmap = () => {
        console.log('OPEN ROADMAP')
    }

  return (
    <div className="app">
      <Sidebar current={ tag } chooseTag={ i => setTag(i) } roadmapNumbers={ roadmapNumbers } openMap={ openRoadmap }/>
      <Suggestions tag={ tag } data={ data } isFetching={ isFetching }/>
    </div>
  );
}

export default App;
