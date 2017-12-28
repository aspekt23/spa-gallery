import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../data.service";
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
    private selectedCategory: any;
    private imagesCollection: any;


    constructor(route: ActivatedRoute, private _dataService: DataService,
                private _flashMessagesService: FlashMessagesService) {

        route.params.subscribe(params => {
            console.log(params);
            this.selectedCategory = params.category; // get id of selected category
            this.getImages();
        });
    }

    ngOnInit() {

        this.getImages();

    }


    getImages() {

        this._dataService.getImages(this.selectedCategory).subscribe(data => {
            console.log(data);
            this.imagesCollection = data.images;
        });
    }


    removeImage(fullpath){
        //http://api.programator.sk/gallery/zvierata/2017-Audi-A4-20T-quattro-front-view-in-motion-02-1.jpg
        if(confirm("are u sure ?")){
            this._dataService.removeImage(fullpath).subscribe(data => {
                console.log(data);
            });
            this.getImages();
            this._flashMessagesService.show('Image was successfully removed!',
                { cssClass: 'alert-success', timeout: 1500 });
        }


    }

}
