import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../data.service";
import {FlashMessagesService} from 'angular2-flash-messages';
import {Http, Headers} from "@angular/http";



@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
    private selectedCategory: any;
    private imagesCollection: any;
    private headers: Headers;

    constructor(route: ActivatedRoute, private _dataService: DataService,
                private _flashMessagesService: FlashMessagesService,
                private _http: Http) {

        route.params.subscribe(params => {
            console.log(params);
            this.selectedCategory = params.category; // get id of selected category
            this.getImages();
        });

        this.headers = new Headers();
        this.headers.append('Content-Type', 'multipart/form-data;boundary=--boundary');
        this.headers.append('Accept', 'application/json');
    }

    ngOnInit() {

        this.getImages();

    }

    transferDataSuccess($event) {
        // let attachmentUploadUrl = 'assets/data/offerspec/offerspec.json';
        // loading the FileList from the dataTransfer
        let dataTransfer: DataTransfer = $event.mouseEvent.dataTransfer;
        if (dataTransfer && dataTransfer.files) {

            // needed to support posting binaries and usual form values



            let files: FileList = dataTransfer.files;

            // uploading the files one by one asynchrounusly
            for (let i = 0; i < files.length; i++) {
                let file: File = files[i];

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
                let url = 'http://api.programator.sk/gallery/'+ this.selectedCategory;
                this._http.post(url, data, {headers : this.headers})
                    .toPromise()
                    .catch(reason => {
                        console.log(JSON.stringify(reason));
                    }).then(result => {
                    console.log('From Promise:', result);
                });
            }
        }
    }


    getImages() {

        this._dataService.getImages(this.selectedCategory).subscribe(data => {
            console.log(data);
            this.imagesCollection = data.images;
        });
    }


    removeImage(fullpath) {
        //http://api.programator.sk/gallery/zvierata/2017-Audi-A4-20T-quattro-front-view-in-motion-02-1.jpg
        if (confirm("are u sure ?")) {
            this._dataService.removeImage(fullpath).subscribe(data => {
                console.log(data);
            });
            this.getImages();
            this._flashMessagesService.show('Image was successfully removed!',
                {cssClass: 'alert-success', timeout: 1500});
        }


    }

}
