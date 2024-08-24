import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserComponent } from './user/user.component';
import { UserLoginComponent } from './landing-page/user-login/user-login.component';
import { UserSignupComponent } from './landing-page/user-signup/user-signup.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CurrentTopicsComponent } from './user-dashboard/current-topics/current-topics.component';
import { RecentFinishedTopicsComponent } from './user-dashboard/recent-finished-topics/recent-finished-topics.component';
import { ComingSoonTopicsComponent } from './user-dashboard/coming-soon-topics/coming-soon-topics.component';
import { AllTopicsComponent } from './user-dashboard/all-topics/all-topics.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'login', component: UserLoginComponent },
      { path: 'signup', component: UserSignupComponent },
      {
        path: 'dashboard', component: UserDashboardComponent,
        children: [
          { path: 'current-topic', component: CurrentTopicsComponent },
          { path: 'recent-finished-topic', component: RecentFinishedTopicsComponent },
          { path: 'coming-soon', component: ComingSoonTopicsComponent },
          { path: 'all-topics', component: AllTopicsComponent },
          { path: '', redirectTo: 'current-topic', pathMatch: 'full' }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
