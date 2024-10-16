import React, { useState } from 'react';
import {
  CaretUpOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import './index.less';

const prefixCls = 'panel';

const Panel = ({ title, children, extra, hasExpand }) => {
  const [expand, setExpand] = useState(true);
  return (
    <div className={prefixCls}>
      <div className="panel-header">
        <div className="panel-header-title">
          <div>
            {typeof title !== 'object' ? <div style={{ fontSize: 16, fontWeight: 'bolder' }}>{title}</div> : title}
            <span className="panel-header-description"></span>
          </div>
        </div>
        <div className="panel-header-extra">
          {extra}
        </div>
      </div>
      <div className="panel-slide-up-down">
        {hasExpand && (
        <div 
          className="panel-slide-up-down-trigger" 
          onClick={() => { setExpand(!expand) }}
        >
          {expand ? <span>收起流程<CaretUpOutlined /></span> : <span>展开流程<CaretDownOutlined /></span>}
        </div>
        )}
        {expand  && (
          <div className="panel-slide-up-down-content">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Panel;