import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class DataService {
 private thumbnails = [];
 private initImages = [
        ['../../../assets/images/priroda1.jpeg'],
        [
            '../../../assets/images/arch.jpeg',
            '../../../assets/images/arch2.jpeg',
            '../../../assets/images/arch3.jpeg',
            '../../../assets/images/arch4.jpeg',
            '../../../assets/images/arch5.jpeg',
            '../../../assets/images/arch6.jpg'
        ],
        ['../../../assets/images/ludia.jpg'],
        ['../../../assets/images/food1.jpg'],
        ['../../../assets/images/auta.jpeg']

    ];

    constructor( private  _localStorage: LocalStorageService) {
    }


    getThumbnails(): any {
        let categoryImages = this._localStorage.retrieve('categoryImages');
        let thumbnails = [];
        for (let i = 0; i <= categoryImages.length - 1; i++) {
            this.thumbnails.push(categoryImages[i][0]);
        }
        return thumbnails;
    }

    saveImages(images): void {
        this._localStorage.store('categoryimages', images);
    }










}
