import Taro from '@tarojs/taro';

const BASE_URL = 'http://127.0.0.1:8000'; // 后端服务器地址

export default function request(options) {
  return Taro.request({
    url: `${BASE_URL}${options.url}`,
    method: options.method || 'GET',
    data: options.data || {},
    credentials: 'include', // 确保请求携带 Cookie
    header: {
      'Content-Type': 'application/json',
      ...options.header,
    },
  }).then((response) => {
    const { statusCode, data } = response;
    if (statusCode >= 200 && statusCode < 300) {
      return data;
    } else {
      Taro.showToast({
        title: data.message || '请求出错',
        icon: 'none',
      });
      return Promise.reject(data);
    }
  });
}
