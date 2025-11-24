export interface Register {
  email: string;
  password: string;
  name: string;
  gender: string;
  birthDate: string;
  phoneNumber: string;
}

export interface VerifyEmail {
  email: string;
  code: string;
}

export interface RegisterResponse {
  status: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
}