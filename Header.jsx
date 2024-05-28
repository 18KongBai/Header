/* eslint-disable no-use-before-define */
// 初始化
import React, { useEffect, useRef, useState } from 'react';
import styles from './head.css';
import backImg from './images/back.png';

const Header = (props) => {
  const { rightChild, backFunc, title, scroll = false, children, leftChild } = props;

  // 透明度
  const [opacity, setOpacity] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (scroll) {
      setOpacity(0);
      if (contentRef.current) {
        contentRef.current.addEventListener('scroll', handleScroll);
      }
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scroll]);

  const handleScroll = () => {
    console.log('滚动事件被触发了');
    // 获取页面的滚动距离
    const scrollTop = contentRef.current.scrollTop;
    // 设置一个阈值，比如页面滚动了30px，我们希望头部背景完全不透明
    const maxDistance = 30;
    if (scrollTop > maxDistance) {
      setOpacity(1);
      return;
    }
    // 计算当前透明度
    const currentOpacity = scrollTop / maxDistance;
    // 确保透明度在0到1之间
    setOpacity(currentOpacity <= 1 ? currentOpacity : 1);
  };

  const handleBack = () => {
    if (backFunc) {
      backFunc();
      return;
    }
    window.history.go(-1);
  };

  const getStyle = () => {
    if (scroll) {
      return {
        position: 'fixed',
        backgroundColor: `rgba(255, 255, 255, ${opacity})`, // 根据滚动距离动态改变背景颜色透明度
        transition: 'background-color 0.3s ease',
      };
    }
    return {};
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerBox} style={getStyle()}>
        <div className={styles.left}>
          {leftChild || <img src={backImg} alt='' onClick={handleBack} />}
        </div>
        <div className={styles.center}>{title}</div>
        <div className={styles.right}>{rightChild || ''}</div>
      </div>
      <div className={styles.content} ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default Header;
