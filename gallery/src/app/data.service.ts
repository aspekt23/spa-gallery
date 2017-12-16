import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable()
export class DataService {
    private categoryImages = [
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
        let thumbnails = [];
        for (let i = 0; i <= this.categoryImages.length - 1; i++) {
            thumbnails.push(this.categoryImages[i][0]);
        }
        return thumbnails;
    }
    getCategoryImages(selectedCategory): any {
        return this.categoryImages[selectedCategory];
    }









}
