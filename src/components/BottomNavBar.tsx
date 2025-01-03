import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './BottomNavBar.scss';

interface NavItem {
  label: string;
  pagePath: string;
}

const navItems: NavItem[] = [
  { label: '首页', pagePath: '/pages/index/index' },
  { label: '输入成绩', pagePath: '/pages/input/index' },
  { label: '排行榜', pagePath: '/pages/leaderboard/index' },
];

const BottomNavBar: React.FC = () => {
  const currentPage = Taro.getCurrentPages().slice(-1)[0]?.route; // 获取当前页面路径

  const handleNavigate = (pagePath: string) => {
    if (currentPage !== pagePath) {
      Taro.switchTab({ url: pagePath }); // 切换页面
    }
  };

  return (
    <View className="bottom-nav-bar">
      {navItems.map((item, index) => (
        <View
          key={index}
          className={`nav-item ${currentPage === item.pagePath ? 'active' : ''}`}
          onClick={() => handleNavigate(item.pagePath)}
        >
          <Text className="nav-label">{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default BottomNavBar;
