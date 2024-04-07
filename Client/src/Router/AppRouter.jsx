import React, {Suspense} from 'react'
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
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
      </Suspense>
    </Router>


    // <div className="App">
    //   <Home/>
    // </div>
  );
}

export default AppRouter;
