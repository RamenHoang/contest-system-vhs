import axiosClient from "./axios-client";

export const AuthApi = {
  async loginGoogle(accessToken: string) {
    try {
      const { data } = await axiosClient.post("/auth/login-google", {
        token: accessToken,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  async loginAdmin(username: string, password: string) {
    try {
      const { data } = await axiosClient.post("/auth/login", {
        username,
        password,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  async logoutAccount(rftoken: string) {
    try {
      const { data } = await axiosClient.post("/auth/logout", {
        refreshToken: rftoken,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
