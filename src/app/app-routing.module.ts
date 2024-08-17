import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegsterComponent } from './Auth/component/regster/regster.component';
import { SupjectsComponent } from './Doctuer/componinet/supjects/supjects.component';
import { LoginComponent } from './Auth/component/login/login.component';
import { NewExamComponent } from './Doctuer/componinet/new-exam/new-exam.component';
import { ExamComponent } from './student/exam/exam.component';
import { StudentComponent } from './Doctuer/componinet/student/student.component';

const routes: Routes = [
  {path:'',redirectTo:'supjects',pathMatch:'full'},
  {path:'regster',component:RegsterComponent},
  {path:'new_exam',component:NewExamComponent},
  {path:'exam/:id',component:ExamComponent},
  {path:'login',component:LoginComponent},
  {path:'supjects',component:SupjectsComponent},
  {path:'newexample',component:NewExamComponent},
  {path:'student',component:StudentComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
