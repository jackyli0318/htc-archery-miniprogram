import React, { useState, useEffect } from 'react';
import { View, Text, Picker, Button } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import BottomNavBar from '../../components/BottomNavBar';
import './index.scss';

const distances = ['全部', '10米', '18米', '30米'];
const targetSizes = ['全部', '40半环', '60半环', '80半环', '40全环', '60全环', '80全环'];
const totalArrows = ['全部', '6箭', '30箭', '36箭', '60箭', '72箭'];

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
  const [filteredScores, setFilteredScores] = useState<Score[]>([]);
  const [selectedDistance, setSelectedDistance] = useState('全部');
  const [selectedTargetSize, setSelectedTargetSize] = useState('全部');
  const [selectedTotalArrows, setSelectedTotalArrows] = useState('全部');

  // 初始化排行榜数据
  const loadScores = () => {
    const storedScores: Score[] = Taro.getStorageSync('leaderboard') || [];
    setScores(storedScores);
    setFilteredScores(storedScores);
  };

  // 页面显示时加载数据
  useDidShow(() => {
    loadScores();
  });

  // 根据筛选条件更新排行榜，并进行排序
  useEffect(() => {
    const filterScores = scores
      .filter((score) => {
        const matchDistance = selectedDistance === '全部' || score.distance === selectedDistance;
        const matchTargetSize = selectedTargetSize === '全部' || score.targetSize === selectedTargetSize;
        const matchTotalArrows =
          selectedTotalArrows === '全部' || score.groupCount * 6 === parseInt(selectedTotalArrows);

        return matchDistance && matchTargetSize && matchTotalArrows;
      })
      .sort((a, b) => {
        // 排序逻辑
        if (b.totalScore !== a.totalScore) {
          return b.totalScore - a.totalScore; // 优先按总分降序
        }
        if (b.count10 + b.countX !== a.count10 + a.countX) {
          return b.count10 + b.countX - (a.count10 + a.countX); // 再按 X+10 的数量降序
        }
        return b.countX - a.countX; // 最后按 X 的数量降序
      });

    setFilteredScores(filterScores);
  }, [selectedDistance, selectedTargetSize, selectedTotalArrows, scores]);

  // 删除成绩
  const deleteScore = (index: number) => {
    const scoreToDelete = filteredScores[index];
    const originalIndex = scores.findIndex(
      (score) =>
        score.name === scoreToDelete.name &&
        score.distance === scoreToDelete.distance &&
        score.targetSize === scoreToDelete.targetSize &&
        score.groupCount === scoreToDelete.groupCount &&
        score.totalScore === scoreToDelete.totalScore &&
        score.count10 === scoreToDelete.count10 &&
        score.countX === scoreToDelete.countX
    );

    if (originalIndex !== -1) {
      const updatedScores = [...scores];
      updatedScores.splice(originalIndex, 1);

      Taro.setStorageSync('leaderboard', updatedScores);
      setScores(updatedScores);
      Taro.showToast({ title: '成绩已删除', icon: 'success' });
    }
  };

  // 获取名次对应的奖牌 emoji
  const getRankEmoji = (rank: number) => {
    if (rank === 1) return '🥇'; // 金牌
    if (rank === 2) return '🥈'; // 银牌
    if (rank === 3) return '🥉'; // 铜牌
    return `#${rank}`; // 普通排名
  };

  return (
    <View className="leaderboard">
      <Text className="title">狮家射箭排行榜</Text>

      {/* 筛选条件 */}
      <View className="filters">
        <Picker mode="selector" range={distances} onChange={(e) => setSelectedDistance(distances[+e.detail.value])}>
          <View className="filter-item">距离: {selectedDistance}</View>
        </Picker>
        <Picker mode="selector" range={targetSizes} onChange={(e) => setSelectedTargetSize(targetSizes[+e.detail.value])}>
          <View className="filter-item">靶纸规格: {selectedTargetSize}</View>
        </Picker>
        <Picker mode="selector" range={totalArrows} onChange={(e) => setSelectedTotalArrows(totalArrows[+e.detail.value])}>
          <View className="filter-item">总箭数: {selectedTotalArrows}</View>
        </Picker>
      </View>

      {/* 排行榜 */}
      <View className="list">
        {filteredScores.map((score, index) => (
          <View className="entry" key={index}>
            <Text className="rank">{getRankEmoji(index + 1)}</Text>
            <View className="details">
              <Text className="name">姓名: {score.name}</Text>
              <Text className="score">总环数: {score.totalScore}</Text>
              <Text>距离: {score.distance}</Text>
              <Text>靶规格: {score.targetSize}</Text>
              <Text>10 + X 数量: {score.count10 + score.countX}</Text>
              <Text>X 数量: {score.countX}</Text>
            </View>
            <Button className="delete-button" onClick={() => deleteScore(index)}>
              删除
            </Button>
          </View>
        ))}
      </View>
      <BottomNavBar />
    </View>
  );
};

export default Leaderboard;
