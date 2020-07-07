import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { TileComponent } from './tile/tile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbDialogModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import { DialogComponent } from './dialog/dialog.component';
import { NgTemplateOutlet } from '@angular/common';
import { Dialog2Component } from './dialog2/dialog2.component';
import { EndDialogComponent } from './end-dialog/end-dialog.component';
const config: SocketIoConfig = {url: "https://ng-tic-tac-toe1.herokuapp.com", options: {}};


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TileComponent,
    DialogComponent,
    Dialog2Component,
    EndDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbDialogModule.forRoot(),
    NbCardModule,
    NbInputModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
