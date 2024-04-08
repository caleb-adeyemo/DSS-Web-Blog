import React, {Suspense} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Login from '../pages/Login/login'
import Home from '../pages/Home'
import './App.css'

function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/'>
            <Route index={true} element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
          </Route>
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "",
            style: {
              margin: "10px",
              padding: "10px",
              display: "inline-flex",
              fontSize: "14px",
              zIndex: 2,
            },
            duration: 4000,
            error: {
              style: {
                background: "#ff6363",
                color: "white",
              },
              iconTheme: {
                primary: "white",
                secondary: "red",
              },
            },
            success: {
              style: {
                background: "green",
                color: "white",
              },
              iconTheme: {
                primary: "white",
                secondary: "green",
              },
            },
          }}
        />
      </Suspense>
    </Router>
  );
}

export default AppRouter;