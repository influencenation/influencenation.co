import { User } from '../../types/user/user.types';

export interface IAuthContext {
  user?: User;
  setUser: (user: User) => void;
  fetchUser: () => void;
}
