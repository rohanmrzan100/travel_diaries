import React from "react";
import ReactDOM  from "react-dom/client";
import App from "./app";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import {Provider} from "react-redux"
import ReduxStore from "./store/store"
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Provider store={ReduxStore()}> 
            <App/>
        </Provider>
    </React.StrictMode>
)
