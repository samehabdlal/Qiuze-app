import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from '../exam/exam.component';
import { SharedModuleModule } from '../../Shared/shared-module/shared-module.module';



@NgModule({
  declarations: [
    ExamComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule
  ],
  exports:[
    ExamComponent,
    CommonModule,
  ]
})
export class StudentModule { }
