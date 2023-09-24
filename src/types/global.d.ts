export {};

declare global {
  enum UserRoles {
    Admin = 'ADMIN',
    User = 'USER',
  }

  type User = {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    isEmailVerified: boolean;
    userRole: UserRoles;
  } | null;
}
