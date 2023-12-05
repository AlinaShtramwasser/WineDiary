
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
//import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { MessageService } from 'primeng/api';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
//for fetching data from external apis and provide them to the app as a stream
import { HttpClientModule } from "@angular/common/http";
import { TableModule } from 'primeng/table';
import { WineryService } from './winery.service';
import { WineryListComponent } from './winery-list/winery-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { ModifyWineryComponent } from './modify-winery/modify-winery.component';
//for login with google
import { LoginComponent } from './login/login.component';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { AuthGuardTs } from './guards/auth.guard';
import { httpInterceptorProviders } from './interceptors/interceptor-providers';
@NgModule({
  declarations: [
    AppComponent,
    WineryListComponent,
    MatConfirmDialogComponent,
    MatConfirmDialogComponent,
    ModifyWineryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ButtonModule,
    VirtualScrollerModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", component: LoginComponent },
      {
        path: 'wineries',
        component: WineryListComponent,
        canActivate: [AuthGuardTs],
      },
      {
        path: 'wineries/:id/edit',
        component: ModifyWineryComponent,
        canActivate: [AuthGuardTs],
      }
    ]),
    TableModule,
    ToastModule,
    InputMaskModule,
    RatingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    PanelModule
  ],
  providers: [MessageService, httpInterceptorProviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
/*TODO
Group the things - eg. Primeng, Materials etc and move them out - make a folder
eg. primeng, inside have primeng.module.ts, just move them there and then say
import {PrimeengModule} from './primeng/primeng.module'
like in  https://www.youtube.com/watch?v=G4BBNq1tgwE
*/
