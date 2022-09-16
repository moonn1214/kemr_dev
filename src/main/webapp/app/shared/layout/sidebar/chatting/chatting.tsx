import './chatting.scss';
import React, { Children, useState } from 'react';
import EntitiesMenuItems from 'app/entities/menu';
import { FaBars } from 'react-icons/fa';
import { IoMdClose, IoMdMenu, IoMdRocket } from 'react-icons/io';
import { IoBagAddOutline, IoCardOutline, IoPersonAddOutline, IoPrintOutline, IoTimeOutline } from 'react-icons/io5';
import { FiSend } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Chatting = active => {
  return (
    <div className="wrapper">
      <div className="user-container">
        <label htmlFor="nickname"></label>
        <input type="text" id="nickname" placeholder="직원명..." />
      </div>

      <div className="display-container">
        <ul className="chatting-list"></ul>
      </div>

      <div className="input-container">
        <span>
          <input type="text" className="chatting-input" />
          <button className="send-button">
            <FiSend className="chattingicon" />
          </button>
        </span>
      </div>
      <Helmet>
        <script src="/socket.io/socket.io.js"></script>
        {/* // 위에 방법이 안될 때 cdnjs -> socket.io 검색 -> </> 해당 표식 클릭 복사  */}
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.2/socket.io.js" integrity="sha512-VJ6+sp2E5rFQk05caiXXzQd1wBABpjEj1r5kMiLmGAAgwPItw1YpqsCCBtq8Yr1x6C49/mTpRdXtq8O2RcZhlQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>  */}
        <script src="js/Chat.js"></script>
      </Helmet>
    </div>
  );
};
export default Chatting;
