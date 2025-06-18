import axios from 'axios';

const BaseUrlLocale = 'https://sandbox.api.dailyshepherd.host/api';

const AxiosInstance = axios.create({
  baseURL: `${BaseUrlLocale}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-API-TOKEN': 'ZqzT7tg5TEyAFxGS288Ryhv',
  },
});

export default AxiosInstance;
