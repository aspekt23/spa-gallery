import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../data.service";

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
    private categoryImages: any = [];
    private selectedCategory: any;
    private categoryName: string;
    constructor(route: ActivatedRoute, _dataService: DataService) {
        route
            .params
            .subscribe(params => {
                console.log(params);
                this.selectedCategory = params['id'];
                console.log(this.selectedCategory);
                this.categoryImages = [
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

            });

    }

    ngOnInit() {


    }

    @Input()
    getThumbnail(id : number) {
        return this.categoryImages[id][0];
    }



}
