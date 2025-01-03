import React from 'react';
import { View, Button } from '@tarojs/components';
import './Keyboard.scss';

interface KeyboardProps {
  onChange: (score: string | null) => void;
  options: string[][];
}

const Keyboard: React.FC<KeyboardProps> = ({ onChange, options }) => {
  const handleClick = (key: string) => {
    if (key === '删除') {
      onChange(null); // 删除最后一个输入
    } else {
      onChange(key);
    }
  };

  return (
    <View className="keyboard">
      {options.map((row, rowIndex) => (
        <View className="keyboard-row" key={rowIndex}>
          {row.map((key) => (
            <Button
              key={key}
              className={`key ${key === '删除' ? 'delete-key' : ''}`}
              onClick={() => handleClick(key)}
            >
              {key}
            </Button>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Keyboard;
