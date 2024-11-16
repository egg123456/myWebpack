import React, { useEffect, useState } from 'react';
// Using ES6 import syntax
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

import 'highlight.js/styles/vs2015.css';

// Then register the languages you need
hljs.registerLanguage('javascript', javascript);

const highlightedCode = hljs.highlight(
  `
  const a = 123;
  const b = 234;
  function add(n, m) {
    return n + m;
  }
  var obj = {};
  Object.defineProperty(obj, 'c', {
    set: function(x) {
      console.log('c set ', x);
      c = x;
    },
    get: function() {
      console.log('c get ', c);
      return c;
    }
  })
  `,
  { language: 'javascript' }
).value

const Code = () => {
  const [count, setCount] = useState({ a: 0 });

  useEffect(() => {
    const hljsDom = document.getElementsByClassName('hljs');
    hljsDom[0].innerHTML = highlightedCode;
  }, [])

  const handleClick = () => {
    // setCount(n=> {
    //   console.log(n, 'console');
    //   return n + 1;
    // });
    count.a += 1000;
    // setCount({...count});

  }

  const handleOtherClick = () => {
    console.log('handleOtherClick', count)
    count.a += 1;
    setCount({...count});
  }

  console.log(count, 'count')

  return (
    <>
      <div style={{ background: 'red'}}>{count.a}</div>
      <div>
        <button onClick={handleClick}>add</button>
        <button onClick={handleOtherClick}>other</button>
      </div>
      <pre><code className="hljs" ></code></pre>
    </>
  )
};

export default Code;
