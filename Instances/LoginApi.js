import AxiosInstance from "./AxiosInstance";

const LoginApi = async () => {
  try {
    const response = await AxiosInstance.post('/login');
    return response;
  } catch (error) {
    console.error('Login API Error:', error);
    throw error;
  }
};

export default LoginApi;
