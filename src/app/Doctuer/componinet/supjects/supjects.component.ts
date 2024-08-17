import { Component, OnInit, inject, signal } from '@angular/core';
import { DocterService } from '../moduel-doctor/docter.service';
import Swal from 'sweetalert2'
import { SwalPortalTargets} from '@sweetalert2/ngx-sweetalert2';
import { doctuer, Subject } from '../interface/doctuer-type';
import { AuthService } from '../../../Auth/servers/auth.service';
import { D } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-supjects',
  templateUrl: './supjects.component.html',
  styleUrl: './supjects.component.scss'
})
export class SupjectsComponent implements OnInit {
ngOnInit(): void {
  this.getallmembers()
  this.getdetailsLogin()
}

docturservec=inject(DocterService)
Loginuser=inject(AuthService)
swtalert=inject(SwalPortalTargets );
Allsupjects=signal<doctuer | any>([])
user=signal<Subject | any>({})
//all supjects
getallmembers(){
this.docturservec.getallsupject().subscribe({
  next:data=>{
    this.Allsupjects.set(data)
  }
})
}
//details login user
getdetailsLogin(){
  this.Loginuser.getRel().subscribe({
    next:(user:any)=>{this.user.set(user)}
  })
}
///delet exam 
OndeletQuize(Quize:string , index:number){
  this.docturservec.Deletsupjuct(Quize).subscribe({
    next:_=>{
      this.Allsupjects().splice(index,1);
      Swal.fire({
        position: "top-end",
        icon: 'success',
        title: "تم حذف السوال",
        showConfirmButton: false,
        timer: 1500
      });
    },
    error:error=>{
      Swal.fire({
        title:error,
        icon:'error',
        buttonsStyling:false,
        background:'red'
      })
    }
  })
}
}
