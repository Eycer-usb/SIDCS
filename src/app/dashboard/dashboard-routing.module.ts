import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { MapComponent } from './map/map.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { ViewLocationComponent } from './view-location/view-location.component';
import { EditLocationComponent } from './edit-location/edit-location.component';

const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      { path: '', component: MapComponent, pathMatch: 'full' },
      { path: 'add-location', component: AddLocationComponent, pathMatch: 'full' },
      { path: 'view-location', component: ViewLocationComponent, pathMatch: 'full' },
      { path: 'edit-location', component: EditLocationComponent, pathMatch: 'full' },
      // { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
