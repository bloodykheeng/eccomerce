import React, { Suspense, useState, useEffect, useRef } from "react";

import logo from "./logo.svg";

//
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/themes/lara-dark-blue/theme.css";

import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate
} from "react-router-dom";

//
const AppLayOut = React.lazy(() => import("./layouts/AppLayout.jsx"));

function App() {
  const location = useLocation();

  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh" // Full viewport height
            }}
          >
            <i
              className="pi pi-spin pi-spinner"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
        }
      >
        <Routes>
          <Route path="/*" element={<AppLayOut />} />

          <Route
            path="*"
            element={
              <div>
                <h1>Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
