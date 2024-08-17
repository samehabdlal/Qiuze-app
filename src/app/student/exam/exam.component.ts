import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { doctuer } from '../../Doctuer/componinet/interface/doctuer-type';
import { DocterService } from '../../Doctuer/componinet/moduel-doctor/docter.service';
import { NgFor } from '@angular/common';
import { AuthService } from '../../Auth/servers/auth.service';
import Swal from 'sweetalert2';
interface admin{
  username:string,
  role: string,
  id: string
}
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss',
})
export class ExamComponent {
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private Dservec: DocterService,
    private Loginuser: AuthService,
    private router: Router
  ) {}
  usersubjects:any[]=[];
  idexam: any;
  total: number = 0;
  indexanswer: any;
  namequize:any
  admin: admin | any;
  users:any
  valdtionvewrepet: boolean = true;
  vewbtn: boolean = true;
  examitem = signal<doctuer | any>([]);
  //details login user
  getdetailsLogin() {
    this.Loginuser.getRel().subscribe({
      next: (user: any) => {
        this.admin = user;
      },
    });
  }
  getuser(){
      this.Loginuser.getusers('students').subscribe({
        next:(data:[] | any)=>{
        let user=data.find((person:any) => person?.username === this.admin?.username)
          this.users=user
        }
      })
  }
  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe({
      next: (param) => {
        this.idexam = param['id'];
        this.getquizeitem();
        this.getdetailsLogin();
      },
    });
    this.getuser()
  }
  getquizeitem() {
    this.Dservec.getasupjectId(this.idexam).subscribe({
      next: (data: doctuer | any) => {
        this.examitem.set(data);
        this.checkvaldexam();
      },
    });
  }

  getreslet() {
    this.total = 0;
    console.log(this.examitem().quiz[this.indexanswer]);
    for (let i in this.examitem().quiz) {
      if (
        this.examitem().quiz[i]?.studentanswaer ===
        this.examitem().quiz[i]?.correctanswer
      ) {
        this.total++;
        this.examitem().quiz[i].total = this.total;
      }
    }
    for (let index of this.examitem().quiz) {
      this.namequize=index
    }
    this.usersubjects.push({
      name: this.examitem.name,
      id: this.idexam,
      degree: this.total,
      namequize:this.namequize.nameQuize
    });
    const model = {
      id:this.admin.id,
      username: this.admin.username,
      email: this.users.email,
      password: this.users.password,
      subjects: this.usersubjects,
    };
    this.Loginuser.updateStudent(this.users.id, model).subscribe((res) => {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'نم تسجيل النتيجه بنجاح ',
        showConfirmButton: false,
        timer: 2000,
      });
    });
    Swal.fire({
      title:
        this.total == 0
          ? 'راسب'
          : 'نتيجتك هي' + this.examitem().quiz.length + '/' + this.total,
      icon: this.total == 0 ? 'error' : 'question',
    });
    this.vewbtn = false;
    this.Loginuser.usernamechrck.set(this.idexam);
  }

  arreaxm = [];
  OndeletQuize(id: any, index: any) {
    this.examitem().quiz.splice(index, 1);
    const model: any = {
      name: this.examitem().name,
      quiz: this.examitem().quiz,
    };
    this.Dservec.updatesupject(this.idexam, model).subscribe();
    if (this.examitem().quiz.length == 0) {
      this.router.navigateByUrl('/supjects');
    }
  }
  Ongetanswaer(event: any) {
    let name = event.value;
    this.indexanswer = event.source.name;
    this.examitem().quiz[this.indexanswer].studentanswaer = name;
  }
// ////Do not repeat the exam
  checkvaldexam() {
    if (this.Loginuser.usernamechrck() === this.idexam) {
      this.valdtionvewrepet = false;
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'لقد تم اختبار الامتحان قبل',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
}
