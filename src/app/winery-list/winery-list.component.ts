import { Component, EventEmitter, Input, OnInit, Output, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DialogService } from '../dialog.service';
import { WineryService } from '../winery.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleSigninService } from '../google-signin.service';

@Component({
	selector: 'app-winery-list',
	templateUrl: './winery-list.component.html',
	styleUrls: ['./winery-list.component.scss']
})
export class WineryListComponent implements OnInit {

	private getAllSubscription: Subscription | undefined;
	codeName = 'winery-grid';
	wineries = [];
	totalRecords: number = 0;
	email: string | undefined;
	name: string | undefined;
	@Output() onSigninSuccess = new EventEmitter();
	@Input() clientId: string | undefined;
	alternativeUrl: string = "assets/images/wineryLogo.jpg"
	/*
	** On component creation (inject services).
	*/
	constructor(
		private _messageService: MessageService,
		// to talk to the web server
		private _data: WineryService,
		private _dialoService: DialogService,
		private router: Router,
		private service: GoogleSigninService,
		private _ngZone: NgZone
	) { }

	/*
	** On component initialization, get all data from the data service.
	*/
	ngOnInit() {
        console.log("in init for wineries");
		// load all records
		this.getAllWineries();
		//setting up all the fields and validations
		/*this.loginForm = this.fb.group({
			googlePassword: ['', Validators.required],
			googleEmail: ['', [Validators.required, Validators.email]],
		});

		this.socialAuthService.authState.subscribe((user) => {
			this.socialUser = user;
			this.isLoggedin = user != null;
			console.log(this.socialUser);
		});

		const loginEmailControl = this.loginForm.get('googleEmail');
		loginEmailControl.valueChanges.pipe(
			debounceTime(1000)).subscribe(
				value => this.setMessage({ control: loginEmailControl })
			);*/
	}

	/**
	 * Calling Google Authentication service
	 */
	//   googleAuthenticate(){
	//     this.auth.authenticateUser(this.clientId, this.onSigninSuccess);
	//   }
	setMessage({ control }: { control: AbstractControl; }): void {
		/*this.emailErrorMessage = '';
		if (control.errors) {
			this.emailErrorMessage = "Please enter a valid email";
		}*/
	}

	ngOnDestroy(): void {
		if (this.getAllSubscription) {
			this.getAllSubscription.unsubscribe();
		}
	}

	onSaveComplete(): void {
		this.getAllWineries();
	}

	//getting all the wineries
	getAllWineries(): void {
		console.log("in get wineries");
		this.getAllSubscription = this._data.getWineries().subscribe({
			next: wineries => {
				this.wineries = wineries;
				this.totalRecords = this.wineries.length;
			},
			error: (err: Error) => this.serviceErrorHandler(`${this._data}.getWinery(id):`, err.message)
		});
	}

	//saving
	saveRating(event: any, id: string) {

		this._data.updateRating(id, event.value)
			.subscribe({
				error: (err: Error) => this.serviceErrorHandler(`${this._data}.updateRating(id, ratingID):`, err.message)
			});
	}

	//deleting
	deleteWinery(id: string) {
		this._dialoService.openConfirmDialog('Are you sure you want to delete this winery?')
			.afterClosed().subscribe(res => {
				if (res) {
					this._data.deleteWinery(id)
						.subscribe({
							next: () => this.onSaveComplete(),
							error: (err: Error) => this.serviceErrorHandler(`${this._data}.deleteWinery(id, ratingID):`, err.message)
						});
				}
			});
	}


	// Handle an error from the data service.
	serviceErrorHandler(where: string, error: string) {
		this._messageService.add({
			key: 'app', sticky: true,
			severity: 'error', summary: 'Get wineries Error', detail: error || 'Server error'
		});
	}

	//loggin out
	public logout() {
		//will get rid of jwt token and go to login screen, storing in local storage
		this.service.signOut();
		this._ngZone.run(() => {
			this.router.navigate(['/']).then(() => window.location.reload());
		});
	}

}

/*might want to create a user with google credential and is authenticated boolean then for the router links 
 <a mat-fab color="primary" class="m-2" *ngIf="user!.IsAuthenticated" [routerLink]="['/wineries',  winery.Id, 'edit']">
*/