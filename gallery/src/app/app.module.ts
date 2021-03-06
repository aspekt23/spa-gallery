import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Ng2Webstorage} from 'ngx-webstorage';
import { FlashMessagesModule } from 'angular2-flash-messages';
import {DndModule} from 'ng2-dnd';
import  {routing} from './app.routing';
import { AppComponent } from './app.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ImagesComponent } from './components/images/images.component';
import {DataService} from "./data.service";
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReaderComponent } from './components/reader/reader.component';


@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    ImagesComponent,
    ReaderComponent,


  ],
  imports: [
    BrowserModule,
    routing,
    Ng2Webstorage,
    HttpModule,
    FlashMessagesModule.forRoot(),
    DndModule.forRoot(),
    BrowserAnimationsModule


  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
