import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NewTopicComponent } from './admin-dashboard/new-topic/new-topic.component';
import { PostponeTopicComponent } from './admin-dashboard/postpone-topic/postpone-topic.component';
import { ExtendTopicComponent } from './admin-dashboard/extend-topic/extend-topic.component';
import { CancelTopicComponent } from './admin-dashboard/cancel-topic/cancel-topic.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AdminLoginComponent },
  { 
    path: 'dashboard', 
    component: AdminDashboardComponent, 
    children: [
      { path: 'new-topic', component: NewTopicComponent },
      { path: 'postpone-topic', component: PostponeTopicComponent },
      { path: 'extend-topic', component: ExtendTopicComponent },
      { path: 'cancel-topic', component: CancelTopicComponent },
      { path: '', redirectTo: 'new-topic', pathMatch: 'full' }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
