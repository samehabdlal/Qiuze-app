import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatCardModule} from '@angular/material/card';
import { AuthModule } from './Auth/module-auth/auth.module';
import { StudentComponent } from './Doctuer/componinet/student/student.component';
import { SupjectsComponent } from './Doctuer/componinet/supjects/supjects.component';
import { DoctorModule } from './Doctuer/componinet/moduel-doctor/doctor.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModuleModule } from './Shared/shared-module/shared-module.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaddingComponent } from './loadding/loadding.component';
import { DelayInterceptor} from './intercptor/handel-spiiner.interceptor';
import { StudentModule } from './student/student/student.module';
@NgModule({
  declarations: [
    AppComponent,
    SupjectsComponent,
    LoaddingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    StudentModule,
    MatCardModule,
    DoctorModule,
    SharedModuleModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DelayInterceptor,
      multi: true
    },
    provideAnimationsAsync(),
  
  ],
  exports:[
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
