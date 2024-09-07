export type CreateUserParams = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export type UpdateUserParams = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export type LoginParams = {
  username: string;
  password: string;
};
