import React, { useState, useEffect } from 'react';
import { View, Text, Input, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getUserInfo, updateOrCreateUser, verifyUser } from '../../services/api';
import './index.scss';

const Mine: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 登录状态
  const [isEditing, setIsEditing] = useState(false); // 编辑模式
  const [formData, setFormData] = useState({
    employee_id: '',
    phone_number: '',
    chinese_name: '',
    english_name: '',
  }); // 表单数据
  const [userInfo, setUserInfo] = useState<any>(null); // 用户信息

  // 页面加载时获取用户信息
  useEffect(() => {
    const storedEmployeeId = Taro.getStorageSync('employee_id'); // 从本地存储获取已登录用户
    if (storedEmployeeId) {
      fetchUserInfo(storedEmployeeId);
    }
  }, []);

  // 获取用户信息并设置到 state
  const fetchUserInfo = async (employeeId: string) => {
    try {
      const response = await getUserInfo(employeeId);
      setUserInfo(response); // 更新用户信息
      setFormData({
        employee_id: response.employee_id || '',
        phone_number: response.phone_number || '',
        chinese_name: response.chinese_name || '',
        english_name: response.english_name || '',
      }); // 将用户信息同步到表单数据
      setIsLoggedIn(true); // 更新登录状态
    } catch (error) {
      console.error('获取用户信息失败:', error);
      setIsLoggedIn(false); // 如果获取失败，设置为未登录状态
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
        Taro.setStorageSync('employee_id', employee_id); // 保存 employee_id 到本地
        Taro.setStorageSync('phone_number', phone_number); // 保存 phone_number 到本地
        Taro.setStorageSync('token', response.token); // 保存 token 到本地
        Taro.showToast({ title: '登录成功', icon: 'success' });
        fetchUserInfo(employee_id); // 登录成功后刷新用户信息
      } else {
        Taro.showToast({ title: response.message || '登录失败', icon: 'none' });
      }
    } catch (err) {
      console.error('登录失败:', err);
      Taro.showToast({ title: '网络错误，请稍后再试', icon: 'none' });
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
      Taro.showToast({ title: '保存失败，请稍后再试', icon: 'none' });
    }
  };

  // 处理用户输入
  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  // 退出登录
  const handleLogout = () => {
    Taro.removeStorageSync('employee_id');
    Taro.removeStorageSync('phone_number');
    Taro.removeStorageSync('token');
    setIsLoggedIn(false);
    setUserInfo(null);
    Taro.showToast({ title: '已登出', icon: 'success' });
  };

  return (
    <View className="container">
      {/* 登录表单 */}
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

      {/* 用户信息展示 */}
      {isLoggedIn && !isEditing && userInfo && (
        <View className="user-info">
          <Text className="title">我的信息</Text>
          <View className="info-box">
            <Text className="info">员工号: {userInfo.employee_id}</Text>
            <Text className="info">中文名: {userInfo.chinese_name}</Text>
            <Text className="info">手机号: {userInfo.phone_number}</Text>
            <Text className="info">英文名: {userInfo.english_name || '未填写'}</Text>
          </View>
          <Button className="button" onClick={() => setIsEditing(true)}>
            修改信息
          </Button>
          <Button className="logout-button" onClick={handleLogout}>
            退出登录
          </Button>
        </View>
      )}

      {/* 编辑用户信息 */}
      {isEditing && (
        <View className="form">
          <Text className="title">编辑信息</Text>
          <Input
            className="input"
            placeholder="手机号"
            value={formData.phone_number}
            onInput={(e) => handleInputChange('phone_number', e.detail.value)}
          />
          <Input
            className="input"
            placeholder="英文名"
            value={formData.english_name}
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
