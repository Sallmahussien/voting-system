import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { NewTopicComponent } from './admin-dashboard/new-topic/new-topic.component';
import { PostponeTopicComponent } from './admin-dashboard/postpone-topic/postpone-topic.component';
import { ExtendTopicComponent } from './admin-dashboard/extend-topic/extend-topic.component';
import { CancelTopicComponent } from './admin-dashboard/cancel-topic/cancel-topic.component';
import { PostponeFormComponent } from './admin-dashboard/postpone-form/postpone-form.component';
import { AuthService } from '../services/auth.service';
import { ExtendFormComponent } from './admin-dashboard/extend-form/extend-form.component';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminComponent,
    NewTopicComponent,
    PostponeTopicComponent,
    ExtendTopicComponent,
    CancelTopicComponent,
    PostponeFormComponent,
    ExtendFormComponent
  ],
  providers: [
    AuthService
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AdminModule { }
