import {Component, OnInit} from '@angular/core';
import {ImagesComponent} from "../images/images.component";
import {DataService} from "../../data.service";
import {LocalStorageService} from 'ngx-webstorage';


@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css'],
    providers: [ImagesComponent]
})
export class GalleryComponent implements OnInit {
    private categories = [
        {id: 0, name: 'priroda'},
        {id: 1, name: 'architektura'},
        {id: 2, name: 'ludia'},
        {id: 3, name: 'jedlo'},
        {id: 4, name: 'auta'}
    ];

    private thumbnails: any[];
    private background: string;


    constructor(private _dataService: DataService, private _localStorage: LocalStorageService) {

        if (!this._localStorage.retrieve('categories')) {
            this._localStorage.store('categories', this.categories);
        } else {
            this.categories = this._localStorage.retrieve('categories');
        }


    }

    ngOnInit() {
        this.getThumbnails();
        this.background = this.thumbnails[0];
        console.log(this.thumbnails);
        console.log('ngonInit');

    }


    addCategory(categoryName): void {
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

    getThumbnails(): void {
        this.thumbnails = this._dataService.getThumbnails();
    }


}
