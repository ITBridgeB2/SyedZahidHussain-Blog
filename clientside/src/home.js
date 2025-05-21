import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import travel from "./images/travel.jpg";
import cooking from "./images/cooking.jpg";
import sports from "./images/sports.jpg";
import social from "./images/social.jpg";
 import "./Styles.css"

const Home = () => {
    return (
        <div className="home">
            {/* Header */}
            <header>
                <h1>The Explorer</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/login" className="btn">Login</Link>
                    <Link to="/register" className="btn">Register</Link>
                </nav>
            </header>

            {/* Hero Section */}
            <section >
                <h2>Discover Local Insights & Experiences</h2>
                <p>Your go-to blog guide for travel, food, sports, and social topics.</p>
            </section>
            <br/>

            {/* Topics Section */}
            
                <h3>Explore by Category</h3>
                <br/>
                
                
               <div className="category-grid">
        <Link to="/travelblogs" className="category-card">
          <span className="emoji">✈️</span> Travel
          <img src={travel} alt="Travel" />
        </Link>
        <Link to="/cookingblogs" className="category-card"> <span className="emoji">🍳</span> Cooking <img src={cooking} alt="Cooking" /></Link>
        <Link to="/sportsblogs" className="category-card"><span className="emoji"> ⚽</span> Sports <img src={sports} alt="sports" /></Link>
        <Link to="/socialblogs" className="category-card"><span className="emoji"> 🗣️</span> Social<img src={social} alt="socail" /></Link>
      </div>
    
             {/* Footer */}
            <footer>
                <p>© 2025 The Explorer | All rights reserved.</p>
            </footer>
            </div>
    );
};

export default Home;
