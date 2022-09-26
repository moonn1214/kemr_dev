import './header.scss';

import React, { useEffect, useState } from 'react';

import { Navbar, Nav, NavbarToggler, Collapse, Input, Button } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, CompanyMark } from './header-components';
/**
 * jkmoon
 * 원무 카테고리 헤더 추가
 */
import { AdminMenu, EntitiesMenu, AccountMenu, OfficeMenu } from '../menus';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ModalLink from 'app/entities/kemr-patient/kemr-patient-search-modal';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from 'app/entities/kemr-patient/kemr-patient.reducer';
import e from 'express';
import KemrMedicalTreatmentDeleteDialog from 'app/entities/kemr-medical-treatment/kemr-medical-treatment-delete-dialog';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const loading = useAppSelector(state => state.kemrPatient.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setData] = useState('');
  const kemrPatientList = useAppSelector(state => state.kemrPatient.entities);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handelChange = event => {
    setSearch(event.target.value);
  };
  const onCheckEnter = event => {
    if (event.key === 'Enter') {
      clickEnterKey();
    }
  };
  const clickEnterKey = () => {
    
  };

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      {/* {renderDevRibbon()} */}

      <LoadingBar className="loading-bar" />
      <Navbar data-cy="navbar" dark expand="md" fixed="top" className="jh-navbar">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <CompanyMark />
        <Input
          className="search-input"
          placeholder="이름 검색..."
          style={{ position: 'relative', width: '200px', height: '44px', marginRight: '10px' }}
          onChange={handelChange}
        
        ></Input>

        {/* 회원조회_버튼 */}

        <ModalLink setData={setData} getData={search}></ModalLink>

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
