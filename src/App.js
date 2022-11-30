import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react';
import Home from './pages/home';
import View from './pages/view';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path ="/view/:id" element={<View/>} />
      </Routes>
    </BrowserRouter>
  )
}