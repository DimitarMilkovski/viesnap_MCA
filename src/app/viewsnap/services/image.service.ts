import { environment } from './../../../enviroments/enviroments';
import { Injectable } from '@angular/core';
import { Album } from '../models/album';
import { Image } from '../models/image';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ImageService {
  
  
  constructor(
    private http: HttpClient,
    private snackBar:MatSnackBar
    ) {
    
  }


   findAllImages(): Observable<Image[]>{
    return this.http.get<Image[]>(`${environment.apiUrl}/photos`);
   }

   findAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${environment.apiUrl}/albums`);
   }

   findAlbumImages(albumId: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${environment.apiUrl}/photos?albumId=${albumId}`);
   }

   findImageById(imageId:number){
    if(imageId === 0){
      return of(this.initializeImage());
    }
    return this.http.get<Image[]>(`${environment.apiUrl}/photos?id=${imageId}`);
   }


   createImage(image:Image):Observable<Image>{
    const headers = new HttpHeaders({'Content-type': 'application/json; charset=UTF-8','Access-Control-Allow-Origin':'*'})
    image.id = null as unknown as number;
    return this.http.post<Image>(`${environment.apiUrl}/photos`, image, {headers}).pipe(
      (deleteObservable) => this.showSnackBarStatus(deleteObservable, 'created','creating')
    )
   }

   updateImage(image:Image):Observable<Image>{
    const headers = new HttpHeaders({'Content-type': 'application/json; charset=UTF-8','Access-Control-Allow-Origin':'*' })
    return this.http.put<Image>(`${environment.apiUrl}/photos/${image.id}`, image, {headers}).pipe(
      (deleteObservable) => this.showSnackBarStatus(deleteObservable, 'updated','updating')
    )
   }

   deleteImage(id:number){
    const headers = new HttpHeaders({'Content-type': 'application/json; charset=UTF-8','Access-Control-Allow-Origin':'*' })
    const url = `${environment.apiUrl}/photos/${id}`

    return this.http.delete<Image>(url,{headers}).pipe(
      (deleteObservable) => this.showSnackBarStatus(deleteObservable, 'deleted','deleting')
    )
   }


   showSnackBarStatus(observable:Observable<Image>, successfullAction:string, errorAction:string):Observable<Image>{
    return observable.pipe(
      tap(() => {
          this.snackBar.open(
              `You have successfully ${successfullAction} the Image!`,
              'Close',
              environment.snackBarConfig
          )
      }),
      catchError((error) => {
          if (error) {
              this.snackBar.open(
                  error?.error?.errors?.[0] || `Error while ${errorAction} the Image!`,
                  'Close',
                  environment.snackBarConfig
              )
          }
          return of()
      })
    )
   }




   private initializeImage():Image[]{
    
    return [{
      id:0,
      albumId:0,
      title:'',
      thumbnailUrl:'',
      url:''
    }]
   }

 


}
