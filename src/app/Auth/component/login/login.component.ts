import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../servers/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private serviec: AuthService,
    private router: Router,
    private toster: ToastrService
  ) {}
  directionsstudents: string[] = [];
  students: any[] = [];
  errornotfound = null;
  type: WritableSignal<string> = signal('students');
  ngOnInit(): void {
    this.getstudents();
    this.directionsstudents = this.serviec.directionsstudents;
  }
  // on add type change
  onaddtype(type: any) {
    this.type.set(type.value);
    this.getstudents();
  }
  //valditeors forms is required
  public loginForms = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    type: [this.type()],
    password: ['', [Validators.required]],
  });
  // get type is forms valditors
  getdata(type: string) {
    return this.loginForms.get(type);
  }
  /// students apis
  getstudents() {
    this.serviec.getusers(this.type()).subscribe({
      // push data
      next: (data: any) => {
        this.students = data;
      },
      // handel errors
      error: (eror) => {
        this.errornotfound = eror;
        this.toster.error('error not found');
      },
    });
  }
  // check password and emails
  CheckPasswordAndEmail() {
    // type forms
    const data = {
      email: this.loginForms.value.email,
      password: this.loginForms.value.password,
    };
     // check email
     const email = this.students.findIndex((da) => da.email === data.email);
     // check password
     const password = this.students.findIndex(
       (da) => da.password == data.password
     );
    // add type is login on db
    const model: any = {
      username: this.students[email]?.username,
      role: this.type(),
    };
    if (email !== -1 && password !== -1) {
      this.serviec.login(model).subscribe({
        next: (data) => {
          this.serviec.user.next(data)
        },
      });
      //////////////////////////////
      this.toster.success('تم تسجيل ');
      //redirect
      this.router.navigate(['/supjects']);
      // reset value is forms input
      this.loginForms.reset();
    } else if (password == -1) {
      this.toster.error(' كلمه المرور خاطه');
      this.loginForms.reset();
    } else {
      this.toster.error('هذا الحساب غير مسجل');
      this.loginForms.reset();
    }
  }
  
  // start supmit data
  supmit() {
    this.CheckPasswordAndEmail();
  }
}
