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
  user: User | null;
  loading: boolean;
  error: string;
  setUser: () => Promise<void>
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  sendOTP: (email: string) => Promise<void>;
  validateOTP: (otp: string, type: string) => Promise<void>;
  logout: () => void;
}

export interface User {
  userId?: string;
  firstName?: string
  lastName?: string
  email?: string
  role?:string
}
