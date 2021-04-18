import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, UserChanges } from 'src/app/core/model/user.model';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as Actions from '../core/ngrx/actions/users-table.actions';
import * as Reducers from '../core/ngrx/reducers/users-table.reducers';
import * as Selectors from '../core/ngrx/selectors/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PROP_MAPPING, getPropByPath } from '../core/utilities';

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent implements OnInit, OnDestroy {
  PROP_MAPPING = PROP_MAPPING;
  userData: User[];
  userDataPending: User[];
  changesSummary: UserChanges[] = [];
  formGroups: FormGroup[] = [];
  isSaving = false;

  constructor(
    private store: Store<Reducers.State>,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.store.select(Selectors.getUserDataCurrentSelector).pipe(take(1))
      .subscribe(userData => {
        this.userData = userData;
        this.initForms();
    });
  }

  ngOnDestroy() {
    // the subscription terminates gracefully
  }

  goToList() {
    this.router.navigateByUrl('/list');
  }

  saveRequested() {
    // For each user, build the new values to update the state and then
    // compare them to the previous values and build a list of changes
    const userDataPending: User[] = [];
    this.formGroups.forEach(formGroup => {
      const user: User = {
        id: +formGroup.get('id').value,
        name: formGroup.get('name').value,
        username: formGroup.get('username').value,
        email: formGroup.get('email').value,
        address: {
          street: formGroup.get('street').value,
          suite: formGroup.get('suite').value,
          city: formGroup.get('city').value,
          zipcode: formGroup.get('zipcode').value,
          geo: {
            lat: formGroup.get('lat').value,
            lng: formGroup.get('lng').value,
          }
        },
        phone: formGroup.get('phone').value,
        website: formGroup.get('website').value,
        company: {
          name: formGroup.get('companyName').value,
          catchPhrase: formGroup.get('catchPhrase').value,
          bs: formGroup.get('bs').value,
        },
      };
      userDataPending.push(user);
    });

    this.userDataPending = userDataPending;
    this.changesSummary = this.buildChangesSummary();
    if (this.changesSummary.length > 0) {
      this.isSaving = true;
    } else {
      this.goToList();
    }
  }

  saveConfirm() {
    // update old and new states
    this.store.dispatch(new Actions.SetUserDataPrev(this.userData));
    this.store.dispatch(new Actions.SetUserDataCurrent(this.userDataPending));
    this.goToList();
  }

  initForms() {
    const forms: FormGroup[] = [];
    this.userData.forEach(user => {
      // set up the form for each user
      const form = this.formBuilder.group({
        id: { value: user.id, disabled: true },
        name: [user.name],
        username: [user.username],
        email: [user.email],
        street: [user.address.street],
        suite: [user.address.suite],
        city: [user.address.city],

        // Was thinking to add validators but would have to double check with requirements first
        // zipcode: [user.address.zipcode, Validators.pattern('^[0-9.\-]*$')],
        // lat: [user.address.geo.lat, Validators.pattern('^[0-9.\-]*$')],
        // lng: [user.address.geo.lng, Validators.pattern('^[0-9.\-]*$')],
        zipcode: [user.address.zipcode],
        lat: [user.address.geo.lat],
        lng: [user.address.geo.lng],
        phone: [user.phone],
        website: [user.website],
        companyName: [user.company.name],
        catchPhrase: [user.company.catchPhrase],
        bs: [user.company.bs]
      });
      forms.push(form);
    });
    this.formGroups = forms;
  }

  private buildChangesSummary(): UserChanges[] {
    // for each user separately
    const allChanges: UserChanges[] = [];
    this.userDataPending.forEach((newUser, index) => {
      const userChanges = [];
      const oldUser = this.userData[index];
      PROP_MAPPING.forEach((propArr, propIndex) => {
        const propPath = propArr[1];
        const propValOld = getPropByPath(oldUser, propPath);
        const propValNew = getPropByPath(newUser, propPath);
        if (propValOld !== propValNew) {
          // prop changed
          userChanges.push({
            propIndex: propIndex,
            oldVal: propValOld,
            newVal: propValNew
          });
        }
      });
      if (userChanges.length > 0) {
        allChanges.push({
          index: newUser.id,
          changes: userChanges
        });
      }
    });
    return allChanges;
  }

}
