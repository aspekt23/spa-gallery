import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable()
export class DataService {

    constructor( private  _localStorage: LocalStorageService) {
    }


    getThumbnails(): any {
        let categoryImages = this._localStorage.retrieve('categoryImages');
        let thumbnails = [];
        for (let i = 0; i <= categoryImages.length - 1; i++) {
            thumbnails.push(categoryImages[i][0]);
        }
        return thumbnails;
    }

    saveImages(images): void {
        this._localStorage.store('images', images);
    }










}
