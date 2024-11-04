import React from 'react';
import { Link } from 'react-router-dom';


function Client() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link to="/client/accueil" className="nav-link collapsed">
            <i className="ri-home-3-line"></i>
            <span>Accueil</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/client/saisie" className="nav-link collapsed">
            <i className="ri-file-list-2-line"></i>
            <span>Saisie CV</span>
          </Link>

        </li>
        <li>
          <Link to="/client/exportpdf" className="nav-link collapsed">
            <i className="bx bx-export"></i>
            <span>Export</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/client/import" className="nav-link collapsed">
            <i className="bx bx-import"></i>
            <span>Import</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Client;
