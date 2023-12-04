//File: winery.service.ts
//Service for getting winery information for the Wine Diary application
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IWinery, Winery } from './winery'

//https://www.techiediaries.com/angular-by-example-httpclient-get/
//https://www.concretepage.com/angular-2/angular-httpclient-get-example
@Injectable({
  providedIn: 'root'
})
export class WineryService {

  /*
    ** --------------------------------------------------------------------
    ** Data declaration.
    */
  baseUrl: string;
  codeName: string;
  token: string;
  httpOptions: HttpHeaders;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  /*
  ** Service constructor, inject http service.
  */
  constructor(protected httpClient: HttpClient) {
    this.codeName = 'winery.service';
    this.baseUrl = "http://localhost:12895/api/winery/";
    this.token = JSON.parse(localStorage.getItem("token") || "");
    this.httpOptions = new HttpHeaders().set('Authorization', 'Bearer ' + this.token); 
  }
  /*
  ** Read (get) all Wineries.
  */
  getWineries(): Observable<any> {
    return this.httpClient.get(this.baseUrl, {headers: this.httpOptions});
  }


  getWinery(id: string | null | undefined): Observable<any> {
    const url = this.baseUrl + id;
    return this.httpClient.get(url, {headers: this.httpOptions})
      //used for debugging, tap allows xss to data wzt modifying it
      .pipe(
        tap(data => console.log('getWinery: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  //Post (api/winery) to add a new one
  createWinery(winery: IWinery): Observable<any> {
    return this.httpClient.post<Winery>(this.baseUrl, winery, { headers: this.httpOptions });

  }

  //Put (api/winery/id) to change idempotent call
  updateWinery(winery: IWinery): Observable<any> {
    const url = this.baseUrl + winery.Id;
    return this.httpClient.put<Winery>(url, winery, { headers: this.httpOptions });
  }

  //Put (api/winery/rating/id/ratingId)
  updateRating(wineryId: string, ratingId: number): Observable<any> {
    const url = this.baseUrl + "rating" + "/" + wineryId + "/" + ratingId;
    console.log(url);
    return this.httpClient.put<Winery>(url, { headers: this.httpOptions });
  }

  deleteWinery(id: string): Observable<any> {
    const url = this.baseUrl + id;
    return this.httpClient.delete<Winery>(url, { headers: this.httpOptions });
  }

  /*
  ** General error handler, should throw a string.
  */
  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      console.error(
        `${this.codeName}.handleError: ${JSON.stringify(error)}`);
      return throwError(() => error.statusText || 'Service error');
    }
    console.error(
      `${this.codeName}.handleError: ${error}`);
    return throwError(() => error.toString() || 'Service error');
  }
}
