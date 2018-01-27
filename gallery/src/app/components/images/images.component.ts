import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../data.service";
import {FlashMessagesService} from 'angular2-flash-messages';
import {Http, Headers} from "@angular/http";
import {ReaderComponent} from '../reader/reader.component';


@Component({
  moduleId: module.id,
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {
  private selectedCategory: any;
  private imagesCollection: any;
  private headers: Headers;
  private background: any;
  private temp: any;
  private imagesToUpload = [];
  private loading: boolean = false;

  constructor(route: ActivatedRoute, private _dataService: DataService,
              private _flashMessagesService: FlashMessagesService,
              private _http: Http) {

    route.params.subscribe(params => {
      console.log(params);
      this.selectedCategory = params.category; // get id of selected category
      this.getImages();
    });


  }

  ngOnInit() {
    this.getImages();
    console.log(this.imagesCollection);
  }

  getImages() {
    this.loading = true;
    this._dataService.request('get', this.selectedCategory).subscribe(data => {
      console.log(data);
      this.imagesCollection = data.images;
      console.log(this.imagesCollection);
      let width = window.innerWidth;
      let imagePath = this.imagesCollection[0].fullpath ? this.imagesCollection[0].fullpath : '';
      this.background = this.getImagePath(width, 0, imagePath);
    this.loading = false;
    });

  }

  getImagePath(width = 0, height = 0, path) {
    return 'http://api.programator.sk/images/' + width + 'x' + height + '/' + path;
  }



  removeImage(fullpath) {
    console.log(this.imagesCollection);
    console.log(fullpath);
    this._dataService.request('delete', fullpath).subscribe(data => {
      console.log(data);
    });
    this.getImages();
    this._flashMessagesService.show('Image was successfully removed!',
      {cssClass: 'alert-success', timeout: 1500});


  }

  showLightBox(item) {
    let width = window.innerWidth - 100;
    let height = window.innerHeight
    let url = this.getImagePath(width, height, '/' + item);
    document.getElementById('overlay').style.display = "block";
    document.getElementById('overlay').innerHTML = '<img class="lightImage" src="' + url + '">';
  }

  hideOverlay() {
    document.getElementById('overlay').style.display = "none";
  }

  // changeListener($event): void {
  //   console.log(event);
  //   this.readThis($event.target);
  // }
  //
  // readThis(inputValue: any): void {
  //   var file: File = inputValue.files[0];
  //   var myReader: FileReader = new FileReader();
  //
  //   myReader.onloadend = function (e) {
  //     // you can perform an action with readed data here
  //     console.log(myReader.result);
  //   }
  //
  //   myReader.readAsText(file);
  // }

  uploadImage() {
    // uploading the files one by one asynchrounusly
    for (let i = 0; i < this.imagesToUpload.length; i++) {
      let file: File = this.imagesToUpload[i];
      console.log(file);

      // just for debugging
      console.log('Name: ' + file.name + '\n Type: ' + file.type + '\n Size: ' + file.size + '\n Date: ' + file.lastModifiedDate);

      // collecting the data to post
      let data = new FormData();
      data.append('file', file);
      data.append('fileName', file.name);
      data.append('fileSize', file.size.toString());
      data.append('fileType', file.type);
      data.append('fileLastMod', file.lastModifiedDate);

      // posting the data
      let url = 'http://api.programator.sk/gallery/' + this.selectedCategory;
      this._http.post(url, data)
        .toPromise()
        .catch(reason => {
          console.log(JSON.stringify(reason));
        });
    }
    console.log('images upload done');
    this.getImages();
  }


  previewFile($event) {
    if ($event) {
      let dataTransfer: DataTransfer = $event.mouseEvent.dataTransfer;
      if (dataTransfer && dataTransfer.files) {
        // needed to support posting binaries and usual form values
        let files: FileList = dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
          let file: File = files[i];
          console.log(file);
          this.collectImages(files[i]);
          this.createElement("img", URL.createObjectURL(file));
        }
      }
    }
    else {
      let file = (<HTMLInputElement>document.querySelector('input[type=file]')).files[0];
      console.log(file);
      let reader = new FileReader();
      this.collectImages(file);
      reader.onload = (evt) => {
        this.createElement("img", reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
    console.log(this.imagesToUpload);
  }

  collectImages(file) {
    let length = this.imagesToUpload.length;
    this.imagesToUpload[length] = file;
    console.log(this.imagesToUpload);
  }

  resetValues(id){
    this.imagesToUpload = [];
    var elementToClear = document.getElementById(id);
    while (elementToClear.firstChild) {
      elementToClear.removeChild(elementToClear.firstChild);
    }
  }
  createElement(type, src) {
    let elem = document.createElement(type);
    elem.className = "previewImage";
    elem.src = src;
    document.getElementById("previewImages").appendChild(elem);
  }


}
