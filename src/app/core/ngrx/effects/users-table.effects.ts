import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { UserDataService } from '../../services/user-data.service';
import * as UsersTableActions from '../actions/users-table.actions';
import * as UserTableActions from '../actions/users-table.actions';
import * as Reducers from '../reducers/users-table.reducers';
import { User } from '../../model/user.model';
import { Store } from '@ngrx/store';

@Injectable()
export class UsersTableEffects {

  constructor(
    private actions$: Actions,
    private userDataService: UserDataService,
    private store: Store<Reducers.State>
  ) { }

  @Effect({ dispatch: false })
  retrieveUserData$ = this.actions$.pipe(
    ofType<UsersTableActions.GetUserData>(
      UsersTableActions.UsersTableActionTypes.GET_USER_DATA
    ),
    mergeMap((action: UsersTableActions.GetUserData) => {
      return this.userDataService.getUserData().pipe(
        map((userDataResponse: User[]) => {
          this.store.dispatch(new UserTableActions.SetUserDataCurrent(userDataResponse));
          this.store.dispatch(new UserTableActions.SetUserDataPrev(userDataResponse));
        })
      );
    }));

}
