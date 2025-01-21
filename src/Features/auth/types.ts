export interface OTPInputProps {
  length: number;
  value: string[];
  onChange: (value: string[]) => void;
}

export interface SocialLoginButtonProps {
  provider: "google" | "linkedin";
  onClick: () => void;
}

export interface SocialSignupButtonProps {
  provider: "google" | "linkedin";
  onClick: () => void;
}
export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: unknown;
  loading: boolean;
  error: string;
  setAuth: (data: { accessToken: string; user: unknown }) => void;
  sendOTP: (email: string) => Promise<void>;
  validateOTP: (otp: string) => Promise<void>;
  logout: () => void;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  status: string;
}
