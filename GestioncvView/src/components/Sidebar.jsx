import React from 'react';


import { Link } from 'react-router-dom';
function Sidebar () {

  return (
     <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link to="/admin/accueil" className="nav-link collapsed" >
            <i className="bi bi-grid"></i> <span>Accueil</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/listecandidat" className="nav-link collapsed">
            <i className="bi bi-list"></i>
            <span>Liste des candidats</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/archives" className="nav-link collapsed">
          <i className="bi bi-archive"></i>
            <span>Archives</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/import" className="nav-link collapsed">
            <i className="bx bx-import"></i>
            <span>Import</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
