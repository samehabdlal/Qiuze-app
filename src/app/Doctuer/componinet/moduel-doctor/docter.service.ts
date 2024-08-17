import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { doctuer } from '../interface/doctuer-type';

@Injectable({
  providedIn: 'root'
})
export class DocterService {
  url:any='http://localhost:3001/'
  constructor(private http:HttpClient) { };
  creatsupject(Model:any[]):Observable<any>{
   return this.http.post('http://localhost:3001/supjects',Model)
  }
// allsupjects=signal<any>()
  updatesupject(id:number,Model:any[]):Observable<any>{
    return this.http.put(this.url+`supjects/`+id,Model)
   }
   // get all supjects
   getallsupject(){
    return this.http.get('http://localhost:3001/supjects')
  }
   // get all supjects
   getasupjectId(id:any){
    return this.http.get('http://localhost:3001/supjects/'+id)
  }
  
  Deletsupjuct(id:string){
    return  this.http.delete(`http://localhost:3001/supjects/`+id)
  }
}