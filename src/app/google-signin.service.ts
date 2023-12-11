//Service for handling signing in with google
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


  public signOut(): any {//will need to call something from server here
    localStorage.removeItem("token");
    console.log("token deleted");
  }

  logInWithGoogle(credential: string): Observable<any> {
    //this.path = "http://localhost:12895/LoginWithGoogle/"; 
    this.path = "https://wineryapi.azurewebsites.net/LoginWithGoogle/";
    const header = new HttpHeaders().set('Content-type', "application/json");
    //fyi: observable tutorial: https://www.tektutorialshub.com/angular/angular-observable-tutorial-using-rxjs/

    return this.http.post(this.path, JSON.stringify(credential), { headers: header, withCredentials: true });
  }
}
