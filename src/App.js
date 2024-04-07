import React, { Suspense, useState, useEffect, useRef } from "react";

import logo from "./logo.svg";

//
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate
} from "react-router-dom";
//
import AppRoutes from "./AppRoutes";

function App() {
  const location = useLocation();

  // ===========  App routes ===========
  let myroutes = AppRoutes();
  const [defaultRoutes, setDefaultRoutes] = useState(myroutes);

  useEffect(() => {
    setDefaultRoutes(myroutes);
  }, [myroutes]);
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
          {defaultRoutes.map((route, index) => {
            return (
              <Route
                path={route.path}
                key={index}
                element={<route.element location={location} />}
              />
            );
          })}

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
