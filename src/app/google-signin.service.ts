import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

// for an example: https://www.youtube.com/watch?v=G4BBNq1tgwE in particular
// https://github.com/israelquiroz93/JWTClientYT/blob/master/src/app/services/auth.service.ts
export class GoogleSigninService {
  //the path and client id can both go into an environment file so that ppl can't see them
  path: string | undefined;


  constructor(private http: HttpClient,
    private route: ActivatedRoute) {
      path: this.route.snapshot.url[0];
  }


  public signOut(): any {
    localStorage.removeItem("token");
    console.log("token deleted");
  }

  logInWithGoogle(credential: string): Observable<any> {
    //debugger;
    //this.baseUrl = "http://localhost:12895/api/winery/";
    this.path = "http://localhost:12895/LoginWithGoogle/"; //window.location.href;//(should be "https://localhost:12895/")
    const header = new HttpHeaders().set('Content-type', "application/json");
    //this works but doesn't post it anywhere
    /*
    const obs = new Observable((observer) => {
        observer.next(credentials)
    })
    return obs;
    */
    //will have to post it and parse it somewhere so I think it should go to the api that's gonna do that
    //need to watch tutorial meanwhile returning an observable based on tutorial
    //observable tutorial: https://www.tektutorialshub.com/angular/angular-observable-tutorial-using-rxjs/
    
    return this.http.post(this.path, JSON.stringify(credential), { headers: header, withCredentials: true });
  }
}
