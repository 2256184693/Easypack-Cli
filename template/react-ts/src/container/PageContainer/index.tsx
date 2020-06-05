import React from 'react';

import './index.less';

function PageContainer(props) {
  const routeName = props.match.path.slice(1);
  return (
    <div
      className="flex-box page1-wrapper"
      style={{height: '100%', justifyContent: 'center', alignItems: 'center', fontSize: '36px', fontWeight: 'bold'}}
    >
      {routeName}
    </div>
  )
}
export default PageContainer;
