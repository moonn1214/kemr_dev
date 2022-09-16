import React from 'react';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const JYSoftIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/kemr-logo.png" alt="Logo" />
  </div>
);

export const CompanyMark = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <JYSoftIcon />
    <span className="brand-title" style={{ marginLeft: '30px' }}>
      청강한의원-EMR
    </span>
    <span className="search-bar" style={{ marginLeft: '100px' }}></span>
    {/* <span className="navbar-version">{VERSION}</span> */}
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>홈</span>
    </NavLink>
  </NavItem>
);
