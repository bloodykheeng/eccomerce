import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

import ScrollToTop from "./ScrollToTop";

import { BrowserRouter } from "react-router-dom";
//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

//
import { Tooltip } from "primereact/tooltip";

//
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "always",
      refetchOnWindowFocus: false
    },
    mutations: {
      networkMode: "always"
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PrimeReactProvider value={{ unstyled: false }}>
        <QueryClientProvider client={queryClient}>
          <ScrollToTop>
            <App />

            <ReactQueryDevtools initialIsOpen={true} />
            <Tooltip target=".custom-target-icon" />
            <ConfirmDialog />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </ScrollToTop>
        </QueryClientProvider>
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
