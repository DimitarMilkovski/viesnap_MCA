import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'viewsnap', loadChildren: () => import ('./viewsnap/viewsnap.module').then (m=> m.ViewsnapModule)},
  {path: '**', redirectTo:'viewsnap'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
