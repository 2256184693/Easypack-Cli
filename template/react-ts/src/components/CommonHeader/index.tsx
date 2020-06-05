import React from 'react';

import logoImg from '@assets/logo.jpg';

function CommonHeader(props) {
	return (
    <div className="common-header flex-box">
      <img style={{height: '60px', width: 'unset'}} src={logoImg} alt="" className="flex-item logo"/>
      <h3 className="flex-item title">React-Spa Application Created By Easypack-Cli</h3>
    </div>
	);
}
export default CommonHeader;
