import {Component, OnInit} from '@angular/core';
import {ImagesComponent} from "../images/images.component";
import {DataService} from "../../data.service";
import {LocalStorageService} from 'ngx-webstorage';
import {Http} from "@angular/http";
import {FlashMessagesService} from 'angular2-flash-messages';
import {trigger, style, animate, transition, state} from '@angular/animations';


@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css'],
    providers: [ImagesComponent],
    animations: [
        trigger('showCount', [
            state('show', style({
                opacity: 1
            })),
            state('hide', style({
                opacity: 0
            })),
            transition('show => hide', animate('200ms ease-out')),
            transition('hide => show', animate('400ms ease-in'))
        ])
    ]
})
export class GalleryComponent implements OnInit {
    private galleries: any;
    private showCount: boolean = false;
    private imagesCount: any;
    private fullPathUrl: string;
    private defaultImage: string = 'http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png';
    private background: any;
    private path;;


    constructor(private _dataService: DataService,
                private _flashMessagesService: FlashMessagesService) {


    }

    ngOnInit() {
        this.getImagePath(20,540,'awdawdawd');
        this.getGalleries();
        this.galleries.map(item => item['showCount'] = 'hide');

    }


    getGalleries() {
        this._dataService.request('get').subscribe(data => {
            this.galleries = data.galleries;
            console.log(this.galleries);
            if("image" in this.galleries[0]){
                console.log(this.galleries[0].image);
                    let defaultBackground = this.galleries[0].image.fullpath;
                    this.setBackground(defaultBackground);
                    this.galleries.map(item => item['showCount'] = 'hide');
            }


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

        this._dataService.request('get', path).subscribe(data => {
            console.log('getImagesCount');
            this.imagesCount = data.images.length + ' fotiek';
        });
    }


    addGallery() {
      const input = (<HTMLInputElement>document.getElementById('recipient-name')).value;
        let galleryName = input.replace(/\//g, '');
        console.log(galleryName);
        let json = {
            name: galleryName
        };
        this._dataService.request('post', '', json).subscribe(data => {
            this.galleries.push(data);
            this._flashMessagesService.show('Gallery ' + galleryName + ' was successfuly created.',
                {cssClass: 'alert-success', timeout: 1500});
            this.getGalleries();
        }, error => {
            this._flashMessagesService.show('Galéria s takým názvom už existuje',
                {cssClass: 'alert-danger', timeout: 1500});
        });

    };

    removeGallery(item) {
        console.log(item);
        this._dataService.request('delete', item.path).subscribe(data => {

        }, error => {
            console.error(error);
        });
        this.getGalleries();
        this._flashMessagesService.show('Gallery successfuly removed !!',
            {cssClass: 'alert-warning', timeout: 1500});
    }

    getImagePath(width = 0, height = 0, path) {
        if(path){
            this.path = 'http://api.programator.sk/images/' + width + 'x' + height + '/' +path;
            return this.path;
        }
        else return this.defaultImage;
    }



}
