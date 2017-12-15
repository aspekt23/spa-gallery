import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
      routing

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
