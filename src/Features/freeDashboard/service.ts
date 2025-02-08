import { ApiResponse } from "@/types/common";
import apiClient from "../../lib/axios"; // Reuse Axios instance

export const getDashboardDataApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/dashboard");
  return response.data;
};


export const createSubscriptionApi = async (payload: any): Promise<ApiResponse> => {
  const response = await apiClient.post("/payment/create-subscription", payload);
  return response.data;
};


export const getSubscriptionStatusApi = async (subscriptionId: string): Promise<ApiResponse> => {
  const response = await apiClient.get(`/payment/subscription/status?subscription_id=${subscriptionId}`);
  return response.data;
};

