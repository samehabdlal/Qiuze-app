import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../Auth/servers/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit , OnDestroy{
  constructor(private servec:AuthService,private router:Router ,private activatet:ActivatedRoute){}
  userssupscriptions= new Subscription;
  users:any={};
  nav=null
  ngOnInit(): void {
   this.userssupscriptions=this.servec.user.subscribe({
    next:user=>{this.users=user
      console.log(user);
    }
   })
  }
  ngOnDestroy(): void {
    this.userssupscriptions.unsubscribe()
  }
  logout(){
    const model={}
    this.servec.login(model).subscribe({
      next:data=>{console.log(data);
         this.servec.user.next(data)
         this.router.navigate(['/login'])
      }
    })
  }
}
