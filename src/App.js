import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MainPage from "./components/MainPage";
import RoadmapPage from "./components/RoadmapPage";
import SingleFeedbackPage from "./components/SingleFeedbackPage";
import FeedbackForm from "./components/FeedbackForm";

function App() {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route exact path="/">
                        <MainPage />
                    </Route>
                    <Route exact path="/feedback/:id">
                        <SingleFeedbackPage />
                    </Route>
                    <Route exact path="/roadmap">
                        <RoadmapPage />
                    </Route>
                    <Route exact path="/new-feedback">
                        <FeedbackForm />
                    </Route>
                    <Route exact path="/edit-feedback/:id">
                        <FeedbackForm />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
