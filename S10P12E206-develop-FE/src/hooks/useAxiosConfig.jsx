import axios from "axios";
import { baseUrl } from "@/api/url/baseUrl";
import { useNavigate } from "react-router-dom";
import { useAccessTokenState } from "@/context/AccessTokenContext";

const useAxiosConfig = () => {
  const accessToken = useAccessTokenState();
  const navigate = useNavigate();

  const privateAxios = axios.create({
    baseURL: baseUrl,
  });

  privateAxios.interceptors.request.use(
    (config) => {
      if (accessToken.accessToken) {
        config.headers.Authorization = `Bearer ${accessToken.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  privateAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const statusCode = error.response?.status;
      if (statusCode === 401) {
        try {
          const response = await axios.post(baseUrl + "/api/auth/reissue", {
            grantType: "Bearer",
            accessToken: accessToken.accessToken,
            refreshToken: accessToken.refreshToken,
          });
          accessToken.setAccessToken(response.data.accessToken);
          accessToken.setRefreshToken(response.data.refreshToken);

          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${accessToken.accessToken}`;

          // 복제된 요청을 다시 보내고 응답을 반환
          return axios(originalRequest);
        } catch (refreshError) {
          navigate("/");
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
  return { privateAxios };
};

export default useAxiosConfig;
