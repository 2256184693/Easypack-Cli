import React, { useState} from 'react';

import './index.less';

import CommonSider from '@components/CommonSider';

import CommonHeader from '@components/CommonHeader';

import CommonFooter from '@components/CommonFooter';

import {
  Layout,
} from 'antd';
const {
  Sider,
  Content,
  Header,
  Footer
} = Layout;

function LayoutContainer(props) {

  let [siderWidth, setSiderWidth] = useState(250);
	return (
    <Layout className="layout-container">
      <Sider width={siderWidth}>
        <CommonSider />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, height: '100px' }}>
          <CommonHeader />
        </Header>
        <Content
          style={{
            margin: '15px',
            padding: '15px',
            borderRadius: '5px',
            backgroundColor: '#FFF',
            overflowX: 'hidden',
            overflowY: 'auto',
          }}
        >
          {props.children}
        </Content>
        <Footer style={{ padding: 0 }}>
          <CommonFooter />
        </Footer>
      </Layout>
    </Layout>
	);
}
export default LayoutContainer;
