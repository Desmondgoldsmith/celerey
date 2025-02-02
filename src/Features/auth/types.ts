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

interface User {
  email: string;
  // Add other user properties if needed
}
export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  error: string;
  setAuth: (data: { accessToken: string; user: User }) => void;
  sendOTP: (email: string) => Promise<void>;
  validateOTP: (otp: string) => Promise<void>;
  logout: () => void;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  status: string;
}
