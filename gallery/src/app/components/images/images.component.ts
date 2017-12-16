import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../data.service";

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
    private selectedCategory: any;
    private imagesCollection: any = [];


    constructor(route: ActivatedRoute, private _dataService: DataService) {
        route
            .params
            .subscribe(params => {
                console.log(params);
                this.selectedCategory = params['id'];

            });

        this.imagesCollection = this._dataService.getCategoryImages(this.selectedCategory);

    }

    addImage(categoryName): void {
        let categories = this._localStorage.retrieve('categories');
        console.log(categories);
        let i = categories.length;
        console.log(i);
        let obj = {
            id: i,
            name: 'test'
        };
        categories.push(obj);
        this._localStorage.store('categories', categories);
    }


    ngOnInit() {}





}
