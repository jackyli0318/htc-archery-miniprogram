import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import BottomNavBar from '../../components/BottomNavBar';
import './index.scss';

interface Score {
  name: string;
  distance: string;
  targetSize: string;
  groupCount: number;
  totalScore: number;
  count10: number;
  countX: number;
}

const Leaderboard: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const storedScores = Taro.getStorageSync('scores') || [];
    // 排序逻辑
    const sortedScores = storedScores.sort((a: Score, b: Score) => {
      if (b.totalScore !== a.totalScore) {
        return b.totalScore - a.totalScore; // 按总环数降序
      }
      if (b.count10 !== a.count10) {
        return b.count10 - a.count10; // 按 10 + X 数量降序
      }
      return b.countX - a.countX; // 按 X 数量降序
    });
    setScores(sortedScores);
  }, []);

  return (
    <View className="leaderboard">
      <Text className="title">排行榜</Text>
      {scores.map((score, index) => (
        <View className="entry" key={index}>
          <Text className="rank">#{index + 1}</Text>
          <View className="details">
            <Text>姓名: {score.name}</Text>
            <Text>距离: {score.distance}</Text>
            <Text>靶规格: {score.targetSize}</Text>
            <Text>总环数: {score.totalScore}</Text>
            <Text>10 + X 数量: {score.count10}</Text>
            <Text>X 数量: {score.countX}</Text>
          </View>
        </View>
      ))}
      <BottomNavBar /> {/* 添加底部导航栏 */}
    </View>
  );
};

export default Leaderboard;
