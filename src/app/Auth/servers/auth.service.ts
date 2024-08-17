import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  url='http://localhost:3001';
      // directions
      directionsstudents = [
        'مده الامتحان ساعه ونصف',
        'يرجى اتباع الخطوات',
        'يسمح بالدخول مرتين فقط',
        ' سؤال عليه درجه ونصف',
      ];
      usernamechrck=signal<any>({})
  // this is push students
  user=new Subject<any>()
  ceratuser(Model:any){
   return this.http.post(`${this.url}/students`,Model)
  }
  getusers(type:string){
  return this.http.get(`${this.url}/${type}`)
  }
  updateStudent(id:number , model:any) {
    return this.http.put(`${this.url}/`+"students/"+id , model)
  }
  login(model:any):Observable<any>{
   return this.http.put(`${this.url}/login/1`,model)
  }
  getRel(){
  return this.http.get(`${this.url}/login/1`)
  }
}
