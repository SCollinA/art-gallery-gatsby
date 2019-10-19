import { Link } from "gatsby";
import React from "react";

export default () => (
    <div className="PageLinks">
      <div className="pageLink">
        <Link to="/gallery"
          activeClassName="activeLink"
        >
          <h2>gallery</h2>
        </Link>
      </div>
      <div className="pageLink">
        <Link to="/about"
          activeClassName="activeLink"
        >
          <h2>about</h2>
        </Link>
      </div>
      <div className="pageLink">
        <Link to="/commissions"
          activeClassName="activeLink"
        >
          <h2>commissions</h2>
        </Link>
      </div>
      <div className="pageLink">
        <Link to="/contact"
          activeClassName="activeLink"
        >
          <h2>contact</h2>
        </Link>
      </div>
    </div>
);
