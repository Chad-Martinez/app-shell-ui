export {};

declare global {
  enum UserRoles {
    Admin = 'ADMIN',
    User = 'USER',
  }

  type User = {
    username: string;
    userRole: UserRoles;
  } | null;
}
