import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../data.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
    private selectedCategory: any;
    private imagesCollection: any = [];
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


    constructor(route: ActivatedRoute, private _dataService: DataService,
                private _localStorage: LocalStorageService) {
        route
            .params
            .subscribe(params => {
                console.log(params);
                this.selectedCategory = params['id']; // get id of selected category

            });


        // initialize images at first time

        if (!this._localStorage.retrieve('categoryImages')) {
            this._localStorage.store('categoryImages', this.categoryImages);
            console.log('init ran');
        }


        this.imagesCollection = this._localStorage.retrieve('categoryImages') ?
            this._localStorage.retrieve('categoryImages'): [];


        console.log(this._localStorage.retrieve('categoryImages')[this.selectedCategory]);


    }

    addImage(): void {
        let allImages = this._localStorage.retrieve('categoryImages');
        let categoryToPush = allImages[this.selectedCategory];
        let src = '../../../assets/images/arch.jpeg';
        categoryToPush.push(src);
        allImages[this.selectedCategory] = categoryToPush;
        this._localStorage.store('categoryImages', allImages);
    }

    getCategoryImages(selectedCategory): any {
        return this.categoryImages[selectedCategory];
    }


    ngOnInit() {
    }


}
