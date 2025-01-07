import React, { useState, useEffect } from 'react';
import { View, Text, Picker, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
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
  useEffect(() => {
    const storedScores: Score[] = Taro.getStorageSync('leaderboard') || [];
    setScores(storedScores);
    setFilteredScores(storedScores);
  }, []);

  // 根据筛选条件更新排行榜
  useEffect(() => {
    const filterScores = scores.filter((score) => {
      const matchDistance = selectedDistance === '全部' || score.distance === selectedDistance;
      const matchTargetSize = selectedTargetSize === '全部' || score.targetSize === selectedTargetSize;
      const matchTotalArrows =
        selectedTotalArrows === '全部' || score.groupCount * 6 === parseInt(selectedTotalArrows);

      return matchDistance && matchTargetSize && matchTotalArrows;
    });

    setFilteredScores(filterScores);
  }, [selectedDistance, selectedTargetSize, selectedTotalArrows, scores]);

  // 删除成绩
  const deleteScore = (index: number) => {
    // 获取筛选后的成绩在原始成绩中的索引
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
      // 删除对应成绩
      const updatedScores = [...scores];
      updatedScores.splice(originalIndex, 1);

      // 更新本地存储和状态
      Taro.setStorageSync('leaderboard', updatedScores);
      setScores(updatedScores);
      Taro.showToast({ title: '成绩已删除', icon: 'success' });
    }
  };

  return (
    <View className="leaderboard">
      <Text className="title">排行榜</Text>

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
      {filteredScores.map((score, index) => (
        <View className="entry" key={index}>
          <View className="rank-section">
            <Text className="rank">#{index + 1}</Text>
            <Button
              className="delete-button"
              onClick={() => deleteScore(index)}
              style={{ marginLeft: '10px', color: '#ff4d4f', fontSize: '14px' }}
            >
              删除
            </Button>
          </View>
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
      <BottomNavBar />
    </View>
  );
};

export default Leaderboard;
