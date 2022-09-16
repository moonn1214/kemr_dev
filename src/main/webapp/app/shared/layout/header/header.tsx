import './header.scss';

import React, { useState } from 'react';

import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, CompanyMark } from './header-components';
/**
 * jkmoon
 * 원무 카테고리 헤더 추가
 */
import { AdminMenu, EntitiesMenu, AccountMenu, OfficeMenu } from '../menus';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href=""></a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      {/* {renderDevRibbon()} */}

      <LoadingBar className="loading-bar" />
      <Navbar data-cy="navbar" dark expand="md" fixed="top" className="jh-navbar">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <CompanyMark />

        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ms-auto" navbar>
            {/* Ȩ downdrop menu */}
            <Home />
            {/* Entity downdrop menu */}
            {props.isAuthenticated && <EntitiesMenu />}
            {/* 
              jkmoon
              원무 카테고리 헤더 추가
            */}
            {props.isAuthenticated && <OfficeMenu />}
            {/* ������ downdrop menu */}
            {props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />}
            {/* ���� downdrop menu */}
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
