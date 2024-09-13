export interface IUsers {
  name: string;
  email: string;
  password: string;
};

export interface IPosts{
    title: string,
    description: string,
    user_id: number
  };

export interface ILikes {
    quantity: number,
    post_id: number
  }

export interface IRegister {
    name: string,
    email: string,
    password: string
}

export interface ILogin {
    name: string,
    email: string,
}