import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servers/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { M } from '@angular/cdk/keycodes';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-regster',
  templateUrl: './regster.component.html',
  styleUrl: './regster.component.scss',
})
export class RegsterComponent implements OnInit  {
  constructor(
    private fb: FormBuilder,
    private serviec: AuthService,
    private router: Router,
    private toster: ToastrService,
  ) {}
  students: any[] = [];
  errornotfound=null
  ngOnInit(): void {
    this.getstudents();
  }
  //valditeors forms is required
  regsterForms = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmpassword: ['', [Validators.required]],
  });
  getdata(type: string) {
    return this.regsterForms.get(type);
  }
  /// students apis
  getstudents() {
    this.serviec.getusers('students').subscribe({
      next:(data:any)=>{this.students = data;},
      error:eror=>{
        this.errornotfound=eror
      this.toster.error("error not found");
      }
    });
  }
  // call data is back end
  supmit() {
    const data: any = {
      username: this.regsterForms.value.username,
      email: this.regsterForms.value.email,
      password: this.regsterForms.value.password,
    };
    const index = this.students.findIndex(
      (item) => item.email === this.regsterForms.value.email
    );
    if (index !== -1 ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "هذا الحساب موجود بالفعل",
        showConfirmButton: true,
        timer: 4000
      });
      this.regsterForms.reset()
    }
    else if(this.errornotfound){
      this.toster.error("error not found");
      this.regsterForms.reset()
     }
    else {
      this.serviec.ceratuser(data).subscribe((data) => {
        this.toster.success('تم تسجيل الدخول');
        this.router.navigate(['/login'])
        this.regsterForms.reset()
      });
    }
  }
}
