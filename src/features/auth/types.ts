export interface User {
    id: string;
    registration_number: string;
    first_name: string;
    last_name: string;
    email: string;
    faculty: string;
    year_of_study: number;
    role: 'student' | 'admin' | 'super_admin';
    is_active: boolean;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }
  