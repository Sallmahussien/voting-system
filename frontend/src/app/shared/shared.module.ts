import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralTopicsComponent } from './general-topics/general-topics.component';



@NgModule({
  declarations: [
    LoginComponent,
    GeneralTopicsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    GeneralTopicsComponent
  ],
})
export class SharedModule { }
