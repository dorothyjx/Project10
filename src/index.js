import react, { useState, useEffect } from "react";
import {createRoot} from "react-dom/client";
import {Dogs} from "./components/index.js";
import "./style.css"

const App = () => {
    return <>
		  <Dogs />
    </>
}

const app = document.querySelector("#app");
const root = createRoot(app);
root.render(<App />)