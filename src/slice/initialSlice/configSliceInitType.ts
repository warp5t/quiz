export interface Category {
  id: number;
  name: string;
}

export interface ConfigState {
  trivia_categories: Category[];
  isLoading: boolean;
  error: string | null;
}


// interface IUser {
//   id: string
//   name: string
//   email: string
//   password: string
//   age: number
//   isAdmin: boolean
// }

// type IBaseUser = Pick<IUser, 'id' | 'name' | 'password'>

// const User: IBaseUser = {
//   id: '1',
//   name: 'name',
//   password: 'pswrd'
// }
