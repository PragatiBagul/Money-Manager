import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "./context/context";
import { SpeechProvider } from "@speechly/react-client";
import "./index.css";
ReactDOM.render(
    <SpeechProvider appId="d8da06ac-5eb1-404d-b063-29268380fdd8" language="en-US">
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>,
  document.getElementById("root")
);
