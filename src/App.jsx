import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";

const Home = React.lazy(()=>import('./components/pages/Home'))
const Details = React.lazy(()=>import('./components/pages/Details'))


const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <Suspense fallback={<div className="p-5">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
