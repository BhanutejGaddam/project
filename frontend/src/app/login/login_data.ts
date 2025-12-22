export interface LoginDataformat {
  username: string;
  email: string;
  password: string;
  role: 'customer' | 'admin' | 'dealer';
}

export const loginData: LoginDataformat[] = [
  {
    username: 'customer01',
    email: 'customer01@example.com',
    password: 'cust@123',
    role: 'customer',
  },
  {
    username: 'admin01',
    email: 'admin01@example.com',
    password: 'admin@123',
    role: 'admin',
  },
  {
    username: 'dealer01',
    email: 'dealer01@example.com',
    password: 'dealer@123',
    role: 'dealer',
  },
];
