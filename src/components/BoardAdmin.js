import React from 'react';

import { Link } from "react-router-dom";

function BoardAdmin() {
  return (
    <div>
      <h2>BoardAdmin</h2>
        <ul>
          <li>
            <Link to="/Login">Log Out</Link>
          </li>
        </ul>
    </div>
  );
}

export default BoardAdmin;
