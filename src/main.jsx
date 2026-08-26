import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // חשוב לוודא שזה מיובא!

import App from "./App";
import { UserProvider } from "./context/UserContext";

import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter> {/* <-- ה-Router חייב לעטוף הכל מבחוץ */}
            <UserProvider>
                <App />
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
);