import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewExamComponent } from '../new-exam/new-exam.component';
import { SharedModuleModule } from '../../../Shared/shared-module/shared-module.module';
import { StudentComponent } from '../student/student.component';

@NgModule({
  declarations: [
    NewExamComponent,
    StudentComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  exports:[
    NewExamComponent,
  ]
})
export class DoctorModule { }
