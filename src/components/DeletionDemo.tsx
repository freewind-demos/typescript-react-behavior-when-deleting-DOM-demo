import React, { useEffect, useState, useRef } from 'react';

interface Props {
  onUnmount: () => void;
}

const DeletionDemo: React.FC<Props> = ({ onUnmount }) => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<number>();
  const componentRef = useRef<HTMLDivElement>(null);

  // Effect 1: 设置一个interval来更新计数
  useEffect(() => {
    console.log('Effect 1: 设置interval');
    intervalRef.current = window.setInterval(() => {
      console.log('Interval tick: 更新计数');
      setCount(c => c + 1);
    }, 1000);

    return () => {
      console.log('Effect 1 cleanup: 清理interval');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Effect 2: 添加一个window事件监听器
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      console.log('Window click event triggered');
    };

    console.log('Effect 2: 添加window click监听器');
    window.addEventListener('click', handleClick);

    return () => {
      console.log('Effect 2 cleanup: 移除window click监听器');
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Effect 3: 使用setTimeout模拟异步操作
  useEffect(() => {
    console.log('Effect 3: 设置timeout');
    const timeoutId = setTimeout(() => {
      console.log('Timeout triggered: 尝试更新状态');
      setCount(c => c + 100);
    }, 5000);

    return () => {
      console.log('Effect 3 cleanup: 清理timeout');
      clearTimeout(timeoutId);
    };
  }, []);

  // 手动删除组件的DOM
  const handleForceDelete = () => {
    const element = componentRef.current;
    if (element && element.parentNode) {
      console.log('手动删除组件DOM');
      element.parentNode.removeChild(element);
    }
  };

  // 模拟删除父级DOM
  const handleForceDeleteParent = () => {
    const element = componentRef.current;
    if (element && element.parentNode && element.parentNode.parentNode) {
      console.log('手动删除父级DOM');
      element.parentNode.parentNode.removeChild(element.parentNode);
    }
  };

  return (
    <div>
      <div ref={componentRef} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <h2>组件内容</h2>
        <p>计数: {count}</p>
        <button onClick={() => setCount(c => c + 1)}>增加计数</button>
      </div>

      <div style={{ margin: '10px' }}>
        <h3>控制按钮</h3>
        <div>
          <button onClick={onUnmount}>正常卸载组件</button>
          {' '}
          <button onClick={handleForceDelete}>强制删除组件DOM</button>
          {' '}
          <button onClick={handleForceDeleteParent}>强制删除父级DOM</button>
        </div>
      </div>
    </div>
  );
};

export default DeletionDemo;
