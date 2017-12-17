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
        }

        this.categories = this._localStorage.retrieve('categories');


    }

    ngOnInit() {
        this.getThumbnails();
        
        console.log(this.thumbnails);


    }


    addCategory(): void {
        let name = prompt("Please enter categry name", "Title");
        if (name != null) {
            let categories = this._localStorage.retrieve('categories');
            console.log(categories);
            let i = categories.length;
            console.log(i);
            let obj = {
                id: i,
                name: name
            };
            categories.push(obj);
            this._localStorage.store('categories', categories);
        }
    }

    getThumbnails(): void {
        this._dataService.getThumbnails();
        this.thumbnails = this._localStorage.retrieve('thumbnails')

    }


}
