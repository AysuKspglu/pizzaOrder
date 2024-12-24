import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import pizzaImage from "../assets/img/home-banner.png";

function Home() {
    return (
        <div className="home">
            <h2>
                KOD ACIKTIRIR
                {"\n"}
                PİZZA, DOYURUR
            </h2>
            <Link to="/order" className="button">ACIKTIM</Link>
        </div>
    );
}

export default Home;