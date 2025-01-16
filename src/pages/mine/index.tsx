import React, { useState, useEffect } from 'react';
import { View, Text, Input, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { verifyUser, getUserInfo, updateOrCreateUser } from '../../services/api';
import './index.scss';

const Mine: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 当前登录状态
  const [isEditing, setIsEditing] = useState(false); // 当前是否处于编辑模式
  const [formData, setFormData] = useState<any>({
    employee_id: '',
    phone_number: '',
    chinese_name: '',
    english_name: '',
  }); // 用户输入的表单数据
  const [userInfo, setUserInfo] = useState<any>({}); // 当前用户信息

  useEffect(() => {
    // 每次进入页面时尝试从本地存储获取用户登录状态
    const storedEmployeeId = Taro.getStorageSync('employee_id');
    if (storedEmployeeId) {
      fetchUserInfo(storedEmployeeId); // 获取用户信息
    }
  }, []);

  // 获取用户信息
  const fetchUserInfo = async (employeeId: string) => {
    try {
      const response = await getUserInfo(employeeId);
      setUserInfo(response); // 更新用户信息
      setIsLoggedIn(true); // 设置登录状态
    } catch (error) {
      console.error('获取用户信息失败:', error);
      setIsLoggedIn(false); // 如果获取失败，设为未登录状态
    }
  };

  // 登录验证
  const handleLogin = async () => {
    const { employee_id, phone_number, chinese_name, english_name } = formData;
    if (!employee_id || !phone_number || !chinese_name) {
      Taro.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }

    try {
      const response = await verifyUser({ employee_id, phone_number, chinese_name, english_name });
      if (response.success) {
        Taro.setStorageSync('employee_id', employee_id); // 保存员工号到本地
        Taro.showToast({ title: '登录成功', icon: 'success' });
        fetchUserInfo(employee_id); // 登录成功后刷新用户信息
      } else {
        Taro.showToast({ title: response.message, icon: 'none' });
      }
    } catch (err) {
      console.error('登录失败:', err);
    }
  };

  // 保存编辑后的用户信息
  const handleSave = async () => {
    const employeeId = Taro.getStorageSync('employee_id');
    if (!employeeId) {
      Taro.showToast({ title: '请先登录', icon: 'none' });
      return;
    }

    try {
      const response = await updateOrCreateUser(employeeId, formData);
      if (response.success) {
        Taro.showToast({ title: response.message, icon: 'success' });
        fetchUserInfo(employeeId); // 更新后刷新用户信息
        setIsEditing(false); // 退出编辑模式
      } else {
        Taro.showToast({ title: response.message, icon: 'none' });
      }
    } catch (err) {
      console.error('保存信息失败:', err);
    }
  };

  // 处理用户输入
  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <View className="container">
      {!isLoggedIn && (
        <View className="form">
          <Text className="title">登录验证</Text>
          <Input
            className="input"
            placeholder="员工号"
            value={formData.employee_id}
            onInput={(e) => handleInputChange('employee_id', e.detail.value)}
          />
          <Input
            className="input"
            placeholder="手机号"
            value={formData.phone_number}
            onInput={(e) => handleInputChange('phone_number', e.detail.value)}
          />
          <Input
            className="input"
            placeholder="中文名"
            value={formData.chinese_name}
            onInput={(e) => handleInputChange('chinese_name', e.detail.value)}
          />
          <Input
            className="input"
            placeholder="英文名（可选）"
            value={formData.english_name}
            onInput={(e) => handleInputChange('english_name', e.detail.value)}
          />
          <Button className="button" onClick={handleLogin}>
            登录
          </Button>
        </View>
      )}

      {isLoggedIn && !isEditing && (
        <View className="user-info">
          <Text className="title">我的信息</Text>
          <Text className="info">员工号: {userInfo.employee_id}</Text>
          <Text className="info">中文名: {userInfo.chinese_name}</Text>
          <Text className="info">手机号: {userInfo.phone_number}</Text>
          <Text className="info">英文名: {userInfo.english_name || '未填写'}</Text>
          <Button className="button" onClick={() => setIsEditing(true)}>
            修改信息
          </Button>
        </View>
      )}

      {isEditing && (
        <View className="form">
          <Text className="title">编辑信息</Text>
          <Input
            className="input"
            placeholder="手机号"
            defaultValue={userInfo.phone_number}
            onInput={(e) => handleInputChange('phone_number', e.detail.value)}
          />
          <Input
            className="input"
            placeholder="英文名"
            defaultValue={userInfo.english_name}
            onInput={(e) => handleInputChange('english_name', e.detail.value)}
          />
          <Button className="button" onClick={handleSave}>
            保存
          </Button>
          <Button className="cancel-button" onClick={() => setIsEditing(false)}>
            取消
          </Button>
        </View>
      )}
    </View>
  );
};

export default Mine;
