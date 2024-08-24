import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from '../shared/shared.module';
import { UserLoginComponent } from './landing-page/user-login/user-login.component';
import { UserSignupComponent } from './landing-page/user-signup/user-signup.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AllTopicsComponent } from './user-dashboard/all-topics/all-topics.component';
import { ComingSoonTopicsComponent } from './user-dashboard/coming-soon-topics/coming-soon-topics.component';
import { CurrentTopicsComponent } from './user-dashboard/current-topics/current-topics.component';
import { RecentFinishedTopicsComponent } from './user-dashboard/recent-finished-topics/recent-finished-topics.component';
import { VoteOptionComponent } from './user-dashboard/current-topics/vote-option/vote-option.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent,
    LandingPageComponent,
    UserLoginComponent,
    UserSignupComponent,
    UserDashboardComponent,
    AllTopicsComponent,
    ComingSoonTopicsComponent,
    CurrentTopicsComponent,
    RecentFinishedTopicsComponent,
    VoteOptionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
  ]
})
export class UserModule { }
