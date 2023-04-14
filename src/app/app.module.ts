
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
//import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {PanelModule} from 'primeng/panel';
//for fetching data from external apis and provide them to the app as a stream
import { HttpClientModule } from "@angular/common/http";
import {TableModule} from 'primeng/table';
import { WineryService } from './winery.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { WineryListComponent } from './winery-list/winery-list.component';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import {RatingModule} from 'primeng/rating';
import {ButtonModule} from 'primeng/button';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { ModifyWineryComponent } from './modify-winery/modify-winery.component';
@NgModule({
  declarations: [	
    AppComponent,
    WineryListComponent,
    MatConfirmDialogComponent,
    MatConfirmDialogComponent,
      ModifyWineryComponent
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
      { path: "", component: WineryListComponent },
      {path: 'wineries', component: WineryListComponent},
      {
        path: 'wineries/:id/edit',
        component: ModifyWineryComponent
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
  providers: [MessageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
