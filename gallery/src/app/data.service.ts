import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DataService {
  private headers: Headers;
  private url: string;
  private path: string;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.url = 'http://api.programator.sk/gallery';
  }

  request(method, path = null, json = null){
    let route = path ? path = '/' + path : '';

    if(method === 'get'){
      return this.http.get(this.url + route,{headers: this.headers})
        .map((res: Response) => res.json())
        .catch((error:any) =>
          // Do messaging and error handling here
          Observable.throw(error.json().error || 'Server error'));
    }
    else if (method === 'post'){
      return this.http.post(this.url + route,json,{headers: this.headers})
        .map((res: Response) => res.json())
        .catch((error:any) =>
          // Do messaging and error handling here
          Observable.throw(error.json().error || 'Server error'));
    }
    else if (method === 'delete') {
      return this.http.delete(this.url + route, {headers: this.headers})
        .map((res: Response) => res.json())
        .catch((error: any) =>
          // Do messaging and error handling here
          Observable.throw(error.json().error || 'Server error'));
    }
  }






  // removeContent(path = null){
  //     let route = path ? path = '/' + path : '';
  //     return this.http.delete(this.url + route,{headers: this.headers})
  //         .map((res: Response) => res.json())
  //         .catch((error:any) =>
  //             // Do messaging and error handling here
  //             Observable.throw(error.json().error || 'Server error'));
  // }


  // removeGallery(path) {
  //     return this.http.delete(this.url + '/' + path, {headers: this.headers})
  //         .map((res: Response) => res.json())
  //         .catch((error:any) =>
  //             // Do messaging and error handling here
  //             Observable.throw(error.json().error || 'Server error'));
  // }
  //
  // removeImage(path) {
  //
  //     return this.http.delete(this.url + '/' + path, {headers: this.headers})
  //         .map((res: Response) => res.json())
  //         .catch((error:any) =>
  //             // Do messaging and error handling here
  //             Observable.throw(error.json().error || 'Server error'));
  //         }


  // getGalleries() {
  //     return this.http.get(this.url,{headers: this.headers})
  //         .map((res: Response) => res.json())
  //         .catch((error:any) =>
  //             // Do messaging and error handling here
  //             Observable.throw(error.json().error || 'Server error'));
  // }
  //
  // getImages(path) {
  //     return this.http.get(this.url + '/' + path,{headers: this.headers})
  //         .map((res: Response) => res.json())
  //         .catch((error:any) =>
  //             // Do messaging and error handling here
  //             Observable.throw(error.json().error || 'Server error'));
  // }

  // addGallery(json) {
  //     return this.http.post(this.url, json, {headers: this.headers})
  //         .map((res: Response) => res.json())
  //         .catch((error:any) =>
  //             // Do messaging and error handling here
  //             Observable.throw(error.json().error || 'Server error'));
  // }

}
