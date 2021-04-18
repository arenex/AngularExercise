import { UsersTableActionTypes, UsersTableActionUnion } from '../actions/users-table.actions';
import { User } from '../../model/user.model';

export interface State {
  usersCurrent?: User[];
  usersPrev?: User[];
}
const initialState: State = {};

export function reducer(state: State = initialState, action: UsersTableActionUnion): State {
  switch (action.type) {
    case UsersTableActionTypes.SET_USER_DATA_CURRENT: {
      return { ...state, usersCurrent: action.payload };
    }
    case UsersTableActionTypes.SET_USER_DATA_PREV: {
      return { ...state, usersPrev: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const getUserDataCurrent = (state: State) => state.usersCurrent;
export const getUserDataPrev = (state: State) => state.usersPrev;
