import React from 'react';
import { View, Button, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import BottomNavBar from '../../components/BottomNavBar';
import './index.scss';

const Index: React.FC = () => {
  return (
    <View className="index">
      <ScrollView
        className="content"
        scrollY
        style={{ height: 'calc(100vh - 60px)' }} // 避开底部导航栏
      >
        <View className="header">
          <Text className="title">HTC Archery Club</Text><br/>
          <Text className="subtitle">🦁狮家射箭排行榜🏹</Text>
        </View>
        <View className="button-container">
          <Button
            className="button"
            onClick={() => Taro.navigateTo({ url: '/pages/input/index' })}
          >
            输入成绩
          </Button>
          <Button
            className="button"
            onClick={() => Taro.navigateTo({ url: '/pages/leaderboard/index' })}
          >
            查看排行榜
          </Button>
        </View>
      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

export default Index;
