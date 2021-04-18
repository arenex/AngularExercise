import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Actions from './core/ngrx/actions/users-table.actions';
import * as Reducers from './core/ngrx/reducers/users-table.reducers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'users-table-app';

  constructor(
    private router: Router,
    private store: Store<Reducers.State>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new Actions.GetUserData());
    this.router.navigateByUrl('./list');
  }

  ngOnDestroy() { }
}
