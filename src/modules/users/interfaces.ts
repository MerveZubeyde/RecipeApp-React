export interface UserContextType {
  isLoggedIn: boolean;
  userDetails: {
    username: string | null;
    email?: string;
  } | null;
}
