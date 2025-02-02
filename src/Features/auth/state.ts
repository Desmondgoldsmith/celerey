import { AxiosError } from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AuthState } from "./types";
import {
  sendOTP as sendOTPApi,
  validateOTP as validateOTPApi,
} from "./service";
import { DEFAULT_AUTH_ERROR_MESSAGE } from "./constants";

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set, get) => ({
      isAuthenticated: true,
      accessToken: null,
      user: null,
      loading: false,
      error: "",

      setAuth: ({ accessToken, user }) =>
        set((state) => {
          state.isAuthenticated = true;
          state.accessToken = accessToken;
          state.user = user;
        }),

      sendOTP: async (email: string) => {
        try {
          set((state) => {
            state.loading = true;
          });
          await sendOTPApi(email);
          set((state) => {
            state.user = { email };
            state.loading = false;
          });
        } catch (error) {
          console.log("Error", error);
          if (error instanceof AxiosError) {
            set((state) => {
              state.loading = false;
              state.error =
                error.response?.data.message || DEFAULT_AUTH_ERROR_MESSAGE;
            });
          }
        }
      },

      validateOTP: async (otp: string) => {
        try {
          set((state) => {
            state.loading = true;
          });
          const email = get().user?.email;
          if (!email) {
            set((state) => {
              state.error = "Please Enter Your Email in the Previous Step";
            });
            return;
          }
          await validateOTPApi(email, otp);
          set((state) => {
            state.isAuthenticated = true;
            state.loading = false;
          });
        } catch (error) {
          console.log("Error", error);
          if (error instanceof AxiosError) {
            set((state) => {
              state.loading = false;
              state.error =
                error.response?.data.message || DEFAULT_AUTH_ERROR_MESSAGE;
            });
          }
        }
      },

      logout: () => {
        set((state) => {
          state.isAuthenticated = false;
          state.accessToken = null;
          state.user = null;
        });
      },
    })),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);
