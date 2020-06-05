/**
 * React 入口
 */

import React from 'react';

import ReactDOM from 'react-dom';

import Page from './Page';

import 'antd/dist/antd.min.css';

import '@/less/common.less';

ReactDOM.render(<Page />, document.getElementById('app'));
