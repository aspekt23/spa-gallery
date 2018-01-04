import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from "rxjs/Rx"


@Injectable()
export class DataService {
    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');

    }

    getGalleries() {
        let url = 'http://api.programator.sk/gallery';
        return this.http.get(url,{headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error:any) =>
                // Do messaging and error handling here
                Observable.throw(error.json().error || 'Server error'));
    }

    getImages(path) {
        let url = 'http://api.programator.sk/gallery/' + path;
        return this.http.get(url,{headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error:any) =>
                // Do messaging and error handling here
                Observable.throw(error.json().error || 'Server error'));
    }

    addGallery(json) {
        let url = 'http://api.programator.sk/gallery';
        return this.http.post(url, json, {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error:any) =>
                // Do messaging and error handling here
                Observable.throw(error.json().error || 'Server error'));
    }

    removeGallery(path) {
        console.log(path);
        let url = 'http://api.programator.sk/gallery/'+path;
        return this.http.delete(url, {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error:any) =>
                // Do messaging and error handling here
                Observable.throw(error.json().error || 'Server error'));
    }

    removeImage(path) {
        console.log(path);
        let url = 'http://api.programator.sk/gallery/'+path;
        return this.http.delete(url, {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error:any) =>
                // Do messaging and error handling here
                Observable.throw(error.json().error || 'Server error'));
            }




}
