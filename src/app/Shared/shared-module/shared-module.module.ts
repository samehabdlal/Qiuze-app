import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from '../componinet/shared/navbar/navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added,
    MatMenuModule,
    RouterModule,
    MatRadioModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule ,
    SweetAlert2Module.forRoot()
  ],
  exports:[
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NavbarComponent,
    RouterModule,
    MatRadioModule,
    MatStepperModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
  ]
})
export class SharedModuleModule { }
