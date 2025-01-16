import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './BottomNavBar.scss';

interface NavItem {
  label: string;
  pagePath: string;
  iconPath: string;
  selectedIconPath: string;
}

const navItems: NavItem[] = [
  { label: '首页', pagePath: '/pages/index/index', iconPath: '/assets/icons/home.png', selectedIconPath: '/assets/icons/home_active.png' },
  { label: '输入成绩', pagePath: '/pages/input/index', iconPath: '/assets/icons/input.png', selectedIconPath: '/assets/icons/input_active.png' },
  { label: '排行榜', pagePath: '/pages/leaderboard/index', iconPath: '/assets/icons/rank.png', selectedIconPath: '/assets/icons/rank_active.png' },
  { label: '我的', pagePath: '/pages/mine/index', iconPath: '/assets/icons/mine.png', selectedIconPath: '/assets/icons/mine_active.png' },
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
      {navItems.map((item, index) => {
        const isActive = currentPage === item.pagePath;
        return (
          <View
            key={index}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => handleNavigate(item.pagePath)}
          >
            <View className="icon-container">
              <img src={isActive ? item.selectedIconPath : item.iconPath} alt={item.label} className="icon" />
            </View>
            <Text className="nav-label">{item.label}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default BottomNavBar;
