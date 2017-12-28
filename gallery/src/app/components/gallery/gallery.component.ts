import {Component, OnInit} from '@angular/core';
import {ImagesComponent} from "../images/images.component";
import {DataService} from "../../data.service";
import {LocalStorageService} from 'ngx-webstorage';
import {Http} from "@angular/http";
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css'],
    providers: [ImagesComponent]
})
export class GalleryComponent implements OnInit {
    private galleries: any;
    private showCount: boolean = false;
    private imagesCount: any;
    private fullPathUrl: string;
    private defaultImage: string = 'http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png';
    private background: any;
    private path = 'http://api.programator.sk/images/';

    constructor(private http: Http, private _dataService: DataService,
                private _flashMessagesService: FlashMessagesService) {

        this.imagesCount = '';
    }

    ngOnInit() {

        this.getGalleries();
        console.log(this.background);

    }


    getGalleries() {
        this._dataService.getGalleries().subscribe(data => {
            this.galleries = data.galleries;

             let defaultBackground = this.galleries[0].image.fullpath;
             this.setBackground(defaultBackground);
             this.galleries.map(item => item['showCount'] = false);
             console.log(this.galleries)
        });
    }

    setBackground(item) {
        console.log('setBackground called');
        if (item) {
            let path = item;
            let width = screen.width / 2;
            this.background = 'http://api.programator.sk/images/' + width + 'x0/' + path;
        }
        else this.background = this.defaultImage;
    }

    getImagesCount(path) {

        this._dataService.getImages(path).subscribe(data => {
            console.log('getImagesCount');
            this.imagesCount = data.images.length + ' fotiek';


        });
    }


    addGallery() {
        let input = prompt("Please enter name of new gallery", "gallery");
        let galleryName = input.replace(/\//g, '');
        let json = {
            name: galleryName
        };
        this._dataService.addGallery(json).subscribe(data => {
            this.galleries.push(data);
            this._flashMessagesService.show('Gallery ' + galleryName + ' was successfuly created.',
                {cssClass: 'alert-success', timeout: 1500});
            this.getGalleries();
        },error => {
            this._flashMessagesService.show('Galéria s takým názvom už existuje',
                {cssClass: 'alert-danger', timeout: 1500});
        });

    };

    removeGallery(item) {
        console.log(item);
        if (confirm("are u sure ?")) {
            this._dataService.removeGallery(item.path).subscribe(data => {

            }, error => {
                console.error(error);
            });

            this.getGalleries();
            this._flashMessagesService.show('Gallery successfuly removed !!',
                {cssClass: 'alert-warning', timeout: 1500});
        }

    }

    // getFullPathUrl(path, width, height = 0) {
    //     console.log('zavolal sa getFULLPATH');
    //     let defaultImage = 'http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png';
    //     if (path) {
    //         var url = 'http://api.programator.sk/images/' + width + 'x' + height + '/' + path;
    //     } else {
    //         var url = defaultImage;
    //     }
    //     this.fullPathUrl = url;
    // }

}
