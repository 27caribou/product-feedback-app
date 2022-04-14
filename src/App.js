import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SuggestionsPage from "./pages/SuggestionsPage";
import FeedbackPage from "./pages/FeedbackPage";
import RoadmapPage from "./pages/RoadmapPage";
import FeedbackFormPage from "./pages/FeedbackFormPage";

function App() {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route exact path="/">
                        <SuggestionsPage />
                    </Route>
                    <Route exact path="/feedback/:id">
                        <FeedbackPage />
                    </Route>
                    <Route exact path="/roadmap">
                        <RoadmapPage />
                    </Route>
                    <Route exact path="/new-feedback">
                        <FeedbackFormPage />
                    </Route>
                    <Route exact path="/edit-feedback/:id">
                        <FeedbackFormPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
