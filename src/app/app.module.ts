import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './core/ngrx/selectors/index';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListViewComponent } from './list-view/list-view.component';
import { EditViewComponent } from './edit-view/edit-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { EffectsModule } from '@ngrx/effects';
import { UsersTableEffects } from './core/ngrx/effects/users-table.effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    EditViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    // StoreDevtoolsModule,
    StoreDevtoolsModule.instrument({ maxAge: 30 }),
    EffectsModule.forRoot([
      UsersTableEffects,
    ]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
