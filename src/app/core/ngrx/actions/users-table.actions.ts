import { Action } from '@ngrx/store';
import { User } from '../../model/user.model';

export enum UsersTableActionTypes {
  GET_USER_DATA = '[UsersTable] GetUserData',
  SET_USER_DATA_CURRENT = '[UsersTable] SetUserDataCurrent',
  SET_USER_DATA_PREV = '[UsersTable] SetUserDataPrev',
}

export class GetUserData implements Action {
  readonly type = UsersTableActionTypes.GET_USER_DATA;
  constructor() { }
}
export class SetUserDataCurrent implements Action {
  readonly type = UsersTableActionTypes.SET_USER_DATA_CURRENT;
  constructor(public payload: User[]) { }
}
export class SetUserDataPrev implements Action {
  readonly type = UsersTableActionTypes.SET_USER_DATA_PREV;
  constructor(public payload: User[]) { }
}

export type UsersTableActionUnion =
  | GetUserData
  | SetUserDataCurrent
  | SetUserDataPrev;
