// Header.js
import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <h1>Teknolojik Yemekler</h1>
            <nav>
                <Link to="/">Ana Sayfa</Link>
                <Link to="/order">Sipariş Oluştur</Link>
            </nav>
        </header>
    );
}

export default Header;