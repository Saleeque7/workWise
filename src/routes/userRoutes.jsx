import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/UserPage/Home';


export default function UserRoutes() {
  return (
    <Routes>
       <Route path="/*" element={<Home />} />
    </Routes>
  )
}
