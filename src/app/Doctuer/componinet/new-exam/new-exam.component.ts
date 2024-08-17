import { Component, model, OnInit, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DocterService } from '../moduel-doctor/docter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrl: './new-exam.component.scss',
})
export class NewExamComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private tostare: ToastrService,
    private servec: DocterService
  ) {}
  anend=signal<boolean>(false)
  name = new FormControl();
  id:number
  namequize: string = '';
  quthsions: any[]=[]
  truequize:any=null
  ngOnInit(): void {
  }
  onvew: boolean = false;
  start: WritableSignal<boolean> = signal(false);
  exam = this.fb.group({
    qution: ['', Validators.required],
    Answer1: ['', [Validators.required]],
    Answer2: ['', [Validators.required]],
    Answer3: ['', [Validators.required]],
    Answer4: ['', [Validators.required]],
  });

  OnStartQuiZe() {
    if (this.name.value === null) {
      this.tostare.error('من فضلك اضف اسم الماده');
      }    
  else{
    this.start.set(true);
    this.namequize = this.name.value;
    }
  }

  ddtailsquize(event: any) {
    this.truequize=event.value
  }
  oncreatqution() {
  if(this.truequize===null){
    this.tostare.error('من فضلك احتر الاجابه الصحيحه')
  }
  else{
    const Model:any={
      nameQuize:this.name.value,
      correctanswer:this.truequize,
      qution:this.exam.value.qution,
      Answer1:this.exam.value.Answer1,
      Answer2:this.exam.value.Answer2,
      Answer3:this.exam.value.Answer3,
      Answer4:this.exam.value.Answer4
    }
    this.exam.reset()
    this.quthsions.push(Model)
      this.onvew=true
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "تم حفظ الاجابه",
        showConfirmButton: false,
        timer: 1500
      })
  }
  }
  onsubmit() {
    if(this.anend()){
      this.anend.set(false)
    }else{
      const model:any={
        name:this.name.value,
        quiz:this.quthsions
      }
        this.servec.creatsupject(model).subscribe({
          next:data=>{
            this.anend.set(true)
            this.id=data.id
          },
          error:error=>{
            Swal.fire({
              title:error,
              icon:'error',
              timer:1000,
            })
          }
         })
    }
  }
  //  delet this is exaim
  ondeletquize() {
    this.exam.reset();
  }
  ONdeletdexam(index:number){
    this.quthsions.splice(index,1);
    const model:any={
      quiz:this.quthsions
    }
    this.servec.updatesupject(this.id,model).subscribe()
  }
  //cancle
  Oncancle() {
    this.exam.reset();
    this.name.reset();
    this.start.set(false);
    this.quthsions = [];
  this.namequize=''
  }
}
