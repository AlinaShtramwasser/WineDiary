import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
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

  logInWithGoogle(credentials: string): Observable<any> {
    this.path = window.location.href;
    const header = new HttpHeaders().set('Content-type', "application/json");
    const obs = new Observable((observer) => {
        observer.next(credentials)
    })
    //will have to post it and parse it somewhere so I think it should go to the api that's gonna do that
    //need to watch tutorial meanwhile returning an observable based on tutorial
    //observable tutorial: https://www.tektutorialshub.com/angular/angular-observable-tutorial-using-rxjs/
    return obs;
    //return this.http.post(this.path, JSON.stringify(credentials), { headers: header });
  }
}
