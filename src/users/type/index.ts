export type CreateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
};

export type LoginParams = {
  username: string;
  password: string;
};
