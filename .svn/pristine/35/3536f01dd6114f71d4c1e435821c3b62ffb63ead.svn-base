import './sidebar.scss';
import React, { Children, useState } from 'react';
import { EntitiesMenu } from '../menus';
import EntitiesMenuItems from 'app/entities/menu';
import { FaBars } from 'react-icons/fa';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { IoBagAddOutline, IoCardOutline, IoPersonAddOutline, IoPrintOutline, IoTimeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Chatting from './chatting/chatting';
import { Helmet } from 'react-helmet';

const Sidebar = () => {
  const [active, setActive] = useState(false);
  const [activeB, setActiveB] = useState(false);
  /**사이드 바  활성화 true | false*/
  const activateNav = () => {
    //!active =true
    setActive(!active);
  };
  // const activateBounce = () => {
  //   setActive(activeB);
  // };
  return (
    <div className={active ? 'sidebar' : 'sidebar-mobile'}>
      <></>
      <br></br>
      <></>
      <br></br>
      <></>
      <br></br>

      <div className="menu-icon" onClick={activateNav}>
        {/* active -> true -> menu / active -> false -> close */}
        {!active ? <IoMdMenu className="menu" /> : <IoMdClose className="menu" />}
      </div>
      <nav>
        {/* 사이드 바 이모티콘 */}
        <ul className={active ? 'ul-item' : 'ul-item oicon'}>
          <li>
            <Link to="/kemr-patient">
              <IoPersonAddOutline className="icon" />
              접수
            </Link>
          </li>
          {/* <li>
            <Link to="/kemr-institution">
              <IoMdBusiness className="icon" />
              요양기관
            </Link>
          </li> */}

          <li>
            <Link to="/kemr-medical-bill">
              <IoCardOutline className="icon" />
              수납
            </Link>
          </li>

          <li>
            <Link to="/kemr-reservation">
              <IoTimeOutline className="icon" />
              예약
            </Link>
          </li>
          <li>
            <Link to="/kemr-medical-treatment">
              <IoPrintOutline className="icon" />
              출력
            </Link>
          </li>
        </ul>
      </nav>

      {/* -> active = false(basic)  */}
      {/* 채팅웹 */}
      {active ? <Chatting /> : <></>}
      <Helmet>
        <script src="/socket.io/socket.io.js"></script>
        {/* // 위에 방법이 안될 때 cdnjs -> socket.io 검색 -> </> 해당 표식 클릭 복사  */}
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.2/socket.io.js" integrity="sha512-VJ6+sp2E5rFQk05caiXXzQd1wBABpjEj1r5kMiLmGAAgwPItw1YpqsCCBtq8Yr1x6C49/mTpRdXtq8O2RcZhlQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>  */}
        <script src="js/Chat.js"></script>
      </Helmet>
      {/* <li>
            <Link to="/kemr-prescription">
              <IoMdPaper className="icon" />
              처방전
            </Link>
          </li>
          <li>
            <Link to="/kemr-medicine">
              <IoMdMedal className="icon" />
              처방약정보
            </Link>
          </li> */}
      {/* <li>
            <Link to="/kemr-doctor">
              <IoMdPerson className="icon" />
              한의사정보
            </Link>
          </li>
          <li>
            <Link to="/kemr-diagnosis">
              <IoMdListBox className="icon" />
              환자진단정보
            </Link>
          </li>
          <li>
            <Link to="/kemr-treatment">
              <IoMdHeart className="icon" />
              환자치료정보
            </Link>
          </li> */}

      {/* <div className="wrapper">
        <div className="user-container">
          <label htmlFor="nickname">직원명</label>
          <input type="text" id="nickname" />
        </div>

        <div className="display-container">
          <ul className="chatting-list"></ul>
        </div>

        <div className="input-container">
          <span>
            <input type="text" className="chatting-input" />
            <button className="send-button">전송</button>
          </span>
        </div>
      </div> */}

      {/* <EntitiesMenuItems /> */}
    </div>
  );
};

export default Sidebar;
