import { ActionReducerMap, MetaReducer, createSelector, createFeatureSelector } from '@ngrx/store';
import * as AppState from '../reducers/users-table.reducers';

export interface State {
  appState: AppState.State;
}
export const reducers: ActionReducerMap<State> = {
  appState: AppState.reducer,
};
export const metaReducers: MetaReducer<State>[] = [];


export const getAppState = createFeatureSelector<AppState.State>('appState');
export const getUserDataCurrentSelector = createSelector(getAppState, AppState.getUserDataCurrent);
export const getUserDataPrevSelector = createSelector(getAppState, AppState.getUserDataPrev);
