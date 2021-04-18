import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListViewComponent } from './list-view/list-view.component';
import { EditViewComponent } from './edit-view/edit-view.component';

const routes: Routes = [
  {
    path: 'edit',
    component: EditViewComponent,
  },
  {
    path: 'list',
    component: ListViewComponent,
  },
  {
    path: '**',
    component: ListViewComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
