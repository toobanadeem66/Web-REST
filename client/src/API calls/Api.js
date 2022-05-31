import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({

    baseURL: "http://localhost:3000",

});

instance.interceptors.request.use(
    (config) => {

        const token = JSON.parse(TokenService.getLocalAccessToken());
        if (token && config.url != "/auth/refresh-token") {
            config.headers["Authorization"] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(

    (res) => {

        return res;
    },
    async (error) => {
        const originalConfig = error.config;

        if (originalConfig.url != "http://localhost:3000/auth/login" && error.response) {

            try {

                const rs = await instance.post("/auth/refresh-token", {
                    refreshToken: JSON.parse(TokenService.getLocalRefreshToken()),
                });
                const data = rs.data
                localStorage.setItem("token", JSON.stringify(data.accessToken));
                localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));

                return instance(originalConfig);
            } catch (_error) {
                return Promise.reject(_error);
            }
        }

        return Promise.reject(error);
    })
export default instance;