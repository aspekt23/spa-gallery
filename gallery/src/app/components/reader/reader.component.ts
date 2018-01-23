import { Component, OnInit, ElementRef, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']

})
export class ReaderComponent implements OnInit {


  constructor() {
  }

  resultSet:any; // dont need it

  previewFile() {
    var preview = document.querySelector('img');
    var file    = (<HTMLInputElement>document.querySelector('input[type=file]')).files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function () {

     console.log(reader.result);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }


  ngOnInit() {
  }

}
