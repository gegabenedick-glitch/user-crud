export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export type UserInput = Omit<User, 'id' | 'createdAt'>;
