import { ApiResponse } from "@/types/common";
import apiClient from "../../lib/axios"; // Reuse Axios instance

export const getDashboardDataApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/dashboard");
  return response.data;
};

export const getFinancialGoalsApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/financial-goals");
  return response.data;
};

export const createSubscriptionApi = async (payload: any): Promise<ApiResponse> => {
  const response = await apiClient.post("/subscription", payload);
  return response.data;
};


export const getSubscriptionStatusApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get(`/subscription/status`);
  return response.data;
};

