import React from 'react';

import { withRouter } from 'react-router';

import {
  Menu
} from 'antd';

function CommonSider(props) {
  const pathName = window.location.hash.slice(1);

  const menuSelect = ({key}) => {
    props.history.push(key);
  }
	return (
		<div className="common-sider">
      <h3 className="text-c name">Easypack</h3>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathName]} onSelect={menuSelect}>
        <Menu.Item key="/page1">
          <span className="nav-text">Nav-1</span>
        </Menu.Item>
        <Menu.Item key="/page2">
          <span className="nav-text">Nav-2</span>
        </Menu.Item>
        <Menu.Item key="/page3">
          <span className="nav-text">Nav-3</span>
        </Menu.Item>
        <Menu.Item key="/page4">
          <span className="nav-text">Nav-4</span>
        </Menu.Item>
        <Menu.Item key="/page5">
          <span className="nav-text">Nav-5</span>
        </Menu.Item>
      </Menu>
    </div>
	);
}
export default withRouter(CommonSider);
