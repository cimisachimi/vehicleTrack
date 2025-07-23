import api from "./axiosInstance";

export const loginApi = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // { token: "..." }
};

export const registerApi = async (email: string, password: string) => {
  const res = await api.post("/auth/register", { email, password });
  return res.status === 201;
};
