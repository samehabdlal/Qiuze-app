import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegsterComponent } from '../component/regster/regster.component';
import { LoginComponent } from '../component/login/login.component';
import { SharedModuleModule } from '../../Shared/shared-module/shared-module.module';
@NgModule({
  declarations: [
    RegsterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  exports:[
    RegsterComponent,
    LoginComponent,
    SharedModuleModule
  ],
})
export class AuthModule { }
