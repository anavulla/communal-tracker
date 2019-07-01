import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEnvironmentComponent } from './add-environment/add-environment.component';
import { EditEnvironmentComponent } from './edit-environment/edit-environment.component';
import { GetEnvironmentsComponent } from './get-environments/get-environments.component';
import { SubscribeEnvironmentComponent } from './subscribe-environment/subscribe-environment.component';
import { SendNotificationsComponent } from './send-notifications/send-notifications.component';
import { GetNotificationsComponent } from './get-notifications/get-notifications.component';

const routes: Routes = [
  {
    path: 'environment/create',
    component: AddEnvironmentComponent
  },
  {
    path: 'environment/edit/:id',
    component: EditEnvironmentComponent
  },
  {
    path: '',
    component: GetEnvironmentsComponent
  },
  {
    path: 'sendnotifications',
    component: SendNotificationsComponent
  },
  {
    path: 'getnotifications',
    component: GetNotificationsComponent
  },
  {
    path: 'environment/subscribe',
    component: SubscribeEnvironmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }