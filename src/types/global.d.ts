export {};

declare global {
  enum UserRoles {
    Admin = 'ADMIN',
    User = 'USER',
    Public = 'PUBLIC',
  }

  type User = {
    username: string;
    userRole: UserRoles;
  };
}
