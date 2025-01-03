import React from 'react';
import { View, Button, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

const Index: React.FC = () => {
  return (
    <View className="index">
      <Text className="title">Archery Club 排行榜系统</Text>
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
    </View>
  );
};

export default Index;
