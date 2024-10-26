import { User } from "../types";

interface LoginResponse {
  user: User;
  token: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const mockAuthService = async (
  data: LoginData
): Promise<LoginResponse> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock successful login
  if (data.email && data.password) {
    return {
      user: {
        id: "1",
        name: "Test User",
        email: data.email,
      },
      token: "mock-jwt-token",
    };
  }

  throw new Error("Invalid credentials");
};
