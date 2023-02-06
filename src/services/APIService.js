const axios = require('axios').default;

class APIService {
    #axiosInstance;
    #tokenServiceInstance
    constructor(tokenService) {
        this.#axiosInstance = axios.create(
            {
                baseURL: "https://api.100ms.live/v2",
                timeout: 3 * 60000
            });
        this.#tokenServiceInstance = tokenService;
       this.#configureAxios();
    }

    #configureAxios(){
        this.#axiosInstance.interceptors.request.use((config) => {
            config.headers = {
                Authorization: `Bearer ${this.#tokenServiceInstance.getManagementToken()}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            };
            return config;
        },
            (error) => Promise.reject(error));
        this.#axiosInstance.interceptors.response.use((response) => {
            return response;
        },
            (error) => {
                console.error("Error in making Api call", { response: error.response?.data });
                const originalRequest = error.config;
                if (
                    (error.response?.status === 403 || error.response?.status === 401) &&
                    !originalRequest._retry
                ) {
                    console.log("Retrying request with refreshed token");
                    originalRequest._retry = true;

                    this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.#tokenServiceInstance.getManagementToken(true);
                    try {
                        return this.axios(originalRequest);
                    } catch (error) {
                        console.error("Unable to Retry!");
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    async get(path,queryParams){
        const res = await this.#axiosInstance.get(path,{params: queryParams});
        console.log(`get call to path - ${path}, status code - ${res.status}`);
        return res.data;
    }

    async post(path,payload){
        const res = await this.#axiosInstance.post(path,payload||{});
        console.log(`post call to path - ${path}, status code - ${res.status}`);
        return res.data;
    }
}

module.exports = {APIService};