import React from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SearchResult from "./pages/SearchResult";
import RecipeId from "./pages/RecipeId";

function App() {
  return (
    <>
      <div className="app">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/recipe/:id" element={<RecipeId />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </Router>      
      </div>
    </>
  )
}

export default App;
