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
import AppRoutes from "./AppRoutes";
import { Button } from "primereact/button";

function App() {
  const location = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // ===========  App routes ===========
  let myroutes = AppRoutes();
  const [defaultRoutes, setDefaultRoutes] = useState(myroutes);

  useEffect(() => {
    setDefaultRoutes(myroutes);
  }, [myroutes]);

  useEffect(() => {
    const handleScroll = () => {
      // Show the button when the user scrolls down 100px from the top of the document
      setShowBackToTop(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
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
        {/* Show spinner only when fetching next page */}
        {showBackToTop && (
          <Button
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: "30px",
              right: "20px",
              zIndex: "1000"
            }}
          >
            <i className="pi pi-arrow-up"></i>
          </Button>
        )}
      </Suspense>
    </>
  );
}

export default App;
