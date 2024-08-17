import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Auth/servers/auth.service';
import { I } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})

export class StudentComponent implements OnInit {
  students:any
  supject:any
  constructor(private servec:AuthService) {
   }
  ngOnInit(): void {
   this.getallstudents()
  }
   getallstudents(){
    this.servec.getusers('students').subscribe({
      next:(data:any)=>{
        this.students=data
      }
    })
   }
}
