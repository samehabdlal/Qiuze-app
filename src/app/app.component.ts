import { Component, OnInit } from '@angular/core';
import { AuthService } from './Auth/servers/auth.service';
import { LoadingSpinnerService } from './loadding/loading-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Quize';
  constructor(private servec:AuthService,public loadinspinner:LoadingSpinnerService){}
  ngOnInit(): void {
   this.getUserData()
  }
  getUserData(){
    this.servec.getRel().subscribe({
      next:reslet=>{
          this.servec.user.next(reslet)
      }
    })
  }
}
