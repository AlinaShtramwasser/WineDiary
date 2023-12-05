import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { GoogleSigninService } from '../google-signin.service';
import { MessageService } from 'primeng/api';
//the logic for the login was written based on: https://www.youtube.com/watch?v=G4BBNq1tgwE
// and https://developers.google.com/identity/gsi/web/guides/overview
// the login part is about 8 min 37 s in
//more tutorials
//google authentication example from: https://www.positronx.io/angular-google-social-login-tutorial-with-example/
//https://www.syncfusion.com/blogs/post/best-practices-for-jwt-authentication-in-angular-apps.aspx also read
//https://blog.angular-university.io/angular-jwt/ 
//https://blog.angular-university.io/angular-jwt-authentication/
//https://medium.com/the-tech-masters/parse-jwt-token-in-angular-d40a26a06760

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private service: GoogleSigninService,
    private _ngZone: NgZone,
    private _messageService: MessageService) {

  }

  ngOnInit() {//@ts-ignore window.OnGoogleLibraryLoad
    
    //create the button here for the google login
    window.onGoogleLibraryLoad = () => {
      //@ts-ignore - this talks to google through the google-one-tap package
      google.accounts.id.initialize({
        client_id: "523587614236-5n3m3des3ckprb697i2smu2aqomqfndp.apps.googleusercontent.com",
        callback: this.handleCredentialResponse.bind(this),
        //google has the first account selected automatically this lets the user choose their account
        auto_select: false,
        //if you click off the popup then close
        cancel_on_tap_outside: true
      });

      const buttonDiv = document.getElementById("buttonDiv");
      //@ts-ignore
      google.accounts.id.renderButton(buttonDiv!, { theme: "filled_black", type:"icon", shape:"circle" }
      );
      //@ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    };
  }
  // Handle an error from the data service.
  serviceErrorHandler(where: string, error: string): void {
    this._messageService.add({
      key: 'app', sticky: true,
      severity: 'error', summary: where, detail: error || 'Server error'
    });
  }
  //this is in minute 13:07 in the youtube tutorial, environment file is 13:58, the authentication part is 23:52 need to watch his other tutorials to figure out how to authenticate
  async handleCredentialResponse(response: CredentialResponse): Promise<void> {
    console.log("in handling credential");
    this.service.logInWithGoogle(response.credential).subscribe({
      next: (x): void => {
        localStorage.setItem("token", JSON.stringify(x.token.token));
        this._ngZone.run(() => {
          this.router.navigate(['wineries']);
        });
      },
      error: (err: Error) => this.serviceErrorHandler("Attempting to contact google failed.  Error:", err.message)

    });
  }
}
