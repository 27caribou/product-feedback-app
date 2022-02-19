import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Suggestions from "./components/Suggestions";

function App() {
    const [ tag, setTag ] = useState('All')
    const [ sortBy, setSortBy ] = useState('')

  return (
    <div className="app">
      <Sidebar current={tag} chooseTag={ i => setTag(i) } />
      <Suggestions />
    </div>
  );
}

export default App;
