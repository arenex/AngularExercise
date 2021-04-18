import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/core/model/user.model';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import * as Reducers from '../core/ngrx/reducers/users-table.reducers';
import * as Selectors from '../core/ngrx/selectors/index';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { PROP_MAPPING, getPropByPath } from '../core/utilities';


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnDestroy {
  alive = true;
  userData: User[];
  userDataPrev: User[];
  PROP_MAPPING = PROP_MAPPING;
  displayedColumns = PROP_MAPPING.map(arr => arr[2]);
  userChangedPropsArr: {};

  constructor(
    private store: Store<Reducers.State>,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.displayedColumns);
    const current$ = this.store.select(Selectors.getUserDataCurrentSelector);
    const prev$ = this.store.select(Selectors.getUserDataPrevSelector);

    zip(current$, prev$).pipe(takeWhile(() => this.alive))
      .subscribe(([usersCurrent, usersPrev]) => {
        if (usersCurrent && usersPrev) {
          this.userData = usersCurrent;
          this.userDataPrev = usersPrev;
          this.markChangedProperties();
        }
      });
  }

  goToEdit() {
    this.router.navigateByUrl('/edit');
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private markChangedProperties() {
    // populate a hashmap for O(1) access to see if prop was changed
    const userChangedPropsArr = [];
    this.userData.forEach((user, index) => {
      const oldUser = this.userDataPrev[index];
      const propObj = {};
      PROP_MAPPING.forEach((propArr, propIndex) => {
        const propName = propArr[0];
        const propPath = propArr[1];
        const propValOld = getPropByPath(oldUser, propPath);
        const propValNew = getPropByPath(user, propPath);
        if (propValOld !== propValNew) {
          propObj[propName] = true;
        }
      });
      userChangedPropsArr.push(propObj);
    });
    this.userChangedPropsArr = userChangedPropsArr;
  }

}
