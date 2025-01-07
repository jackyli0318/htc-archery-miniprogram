import React, { useState } from 'react';
import { View, Picker, Text, Button, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import Keyboard from '../../components/Keyboard';
import BottomNavBar from '../../components/BottomNavBar';
import './index.scss';

const distances = ['10米', '18米', '30米'];
const targetSizes = ['40半环', '60半环', '80半环', '40全环', '60全环', '80全环'];
const groupCounts = [1, 5, 6, 10, 12];

const InputPage: React.FC = () => {
  const [distance, setDistance] = useState('');
  const [targetSize, setTargetSize] = useState('');
  const [groupCount, setGroupCount] = useState(0);
  const [scores, setScores] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [name, setName] = useState('');

  const isHalfRing = targetSize.includes('半环');

  const handleScoreChange = (newScore: string | null) => {
    if (selectedIndex === null) return;

    const updatedScores = [...scores];

    if (newScore === null) {
      updatedScores[selectedIndex] = '';
      setScores(updatedScores);
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    } else {
      updatedScores[selectedIndex] = newScore;
      setScores(updatedScores);
      if (selectedIndex < groupCount * 6 - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    }
  };

  const saveScores = () => {
    if (!name) {
      Taro.showToast({ title: '请输入姓名', icon: 'none' });
      return;
    }

    const numericScores = scores.map((score) =>
      score === 'X' ? 10 : score === 'M' ? 0 : parseInt(score, 10)
    );
    const totalScore = numericScores.reduce((sum, score) => sum + score, 0);
    const count10 = numericScores.filter((score) => score === 10).length;
    const countX = scores.filter((score) => score === 'X').length;

    const userScore = {
      name,
      distance,
      targetSize,
      groupCount,
      totalScore,
      count10,
      countX,
    };

    const existingScores = Taro.getStorageSync('leaderboard') || [];
    const newLeaderboard = [...existingScores, userScore];
    Taro.setStorageSync('leaderboard', newLeaderboard);

    Taro.showToast({ title: '成绩保存成功', icon: 'success' });
    Taro.navigateTo({ url: '/pages/leaderboard/index' });
  };

  return (
    <View className="input">
      <Text className="title text-large">输入射箭成绩</Text>
      <Input
        className="name-input"
        placeholder="请输入姓名"
        value={name}
        onInput={(e) => setName(e.detail.value)}
      />
      <Picker mode="selector" range={distances} onChange={(e) => setDistance(distances[+e.detail.value])}>
        <View className="picker text-medium">选择距离: {distance || '未选择'}</View>
      </Picker>
      <Picker mode="selector" range={targetSizes} onChange={(e) => setTargetSize(targetSizes[+e.detail.value])}>
        <View className="picker text-medium">选择箭靶规格: {targetSize || '未选择'}</View>
      </Picker>
      <Picker mode="selector" range={groupCounts} onChange={(e) => setGroupCount(groupCounts[+e.detail.value])}>
        <View className="picker text-medium">选择组数: {groupCount || '未选择'}</View>
      </Picker>

      <View className="scores">
        {Array.from({ length: groupCount }, (_, groupIndex) => {
          const groupScores = scores.slice(groupIndex * 6, groupIndex * 6 + 6);
          const groupTotal = groupScores.reduce((sum, score) => {
            if (score === 'X') return sum + 10;
            if (score === 'M') return sum;
            if (score && !isNaN(Number(score))) return sum + Number(score);
            return sum;
          }, 0);

          return (
            <View key={groupIndex}>
              <View className="score-row">
                {Array.from({ length: 6 }, (_, arrowIndex) => {
                  const index = groupIndex * 6 + arrowIndex;
                  return (
                    <Text
                      className={`score text-large ${selectedIndex === index ? 'selected' : ''}`}
                      key={index}
                      onClick={() => setSelectedIndex(index)}
                    >
                      {scores[index] !== undefined ? scores[index] : ''}
                    </Text>
                  );
                })}
              </View>
              <Text className="group-total">小计: {groupTotal}</Text>
            </View>
          );
        })}
      </View>

      <Keyboard
        onChange={handleScoreChange}
        options={
          isHalfRing
            ? [['X', '10', '9', '8', '7', '6'], ['M', '删除']]
            : [['X', '10', '9', '8', '7', '6'], ['5', '4', '3', '2', '1', 'M'], ['删除']]
        }
      />

      <Button className="save-button" onClick={saveScores}>
        保存成绩
      </Button>
      <BottomNavBar />
    </View>
  );
};

export default InputPage;
