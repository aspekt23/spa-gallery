import { Component, OnInit } from '@angular/core';
import {ImagesComponent} from "../images/images.component";

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css'],
    providers: [ImagesComponent]
})
export class GalleryComponent implements OnInit {
    private categories: any[];

    constructor() {
        this.categories = [
            {id: 0 , name: 'priroda'},
            {id: 1, name: 'architektura'},
            {id: 2, name: 'ludia'},
            {id: 3, name: 'jedlo'},
            {id: 4, name: 'auta'}
        ];


  }

  ngOnInit() {
      console.log(this.categories);
  }


addCategory(categoryName):void {
   let i = (this.categories[this.categories.length - 1].id)++;
   console.log(i);
   let obj = {
     id : i,
     name: 'novaKategoria'
   };
    this.categories.push(obj);
}



}
