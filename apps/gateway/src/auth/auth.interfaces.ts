import type { UserEntity } from '../user/user.entity';

export type AuthenticatedUser = Pick<UserEntity, 'id' | 'username'>;
export interface JwtPayload {
  sub: number;
  username: string;
}

export interface UserContext {
  req: {
    user: AuthenticatedUser;
  };
}
