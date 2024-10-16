import React from 'react';
import ReactDOM from 'react-dom';

// 这个函数本质不是 hoc
// 所以包裹组件时必须放在最外层，否则无法拿到 OriginalModal.show 方法
const withFunctionalCall = (OriginalModal) => {
  OriginalModal.show = (config) => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    function destroy() {
      const unmountResult = ReactDOM.unmountComponentAtNode(div);
      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
      }
    }

    function render(props) {
      ReactDOM.render(
        <OriginalModal
          visible
          onOk={() => destroy()}
          onCancel={() => destroy()}
          onClose={() => destroy()}
          {...props}
        />,
        div
      );
    }
    render(config);

    return {
      close: destroy,
    };
  };

  return OriginalModal;
};

export default withFunctionalCall;
