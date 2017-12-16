import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Ng2Webstorage} from 'ngx-webstorage';

import  {routing} from './app.routing';

import { AppComponent } from './app.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ImagesComponent } from './components/images/images.component';

import {DataService} from "./data.service";


@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    ImagesComponent,


  ],
  imports: [
    BrowserModule,
    routing,
    Ng2Webstorage,

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
