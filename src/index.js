import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.css";
import "./styles/loader.css";
import App from "./App";
import Test from "./Tests";

ReactDOM.render(
    <React.StrictMode>
        <App />
        {/*<Test/>*/}
    </React.StrictMode>,
    document.getElementById("root")
);

