import { ApiResponse } from "@/types/common";
import apiClient from "../../lib/axios"; // Reuse Axios instance

export const getDashboardDataApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/dashboard");
  return response.data;
};
