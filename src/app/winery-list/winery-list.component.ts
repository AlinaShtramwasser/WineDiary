import { Component, EventEmitter, Input, OnInit, Output, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DialogService } from '../dialog.service';
import { WineryService } from '../winery.service';
import { Router } from '@angular/router';
import { GoogleSigninService } from '../google-signin.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
	alternativeUrl: string = "assets/images/wineryLogo.jpg";
	smallDevice: boolean;
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
		private _ngZone: NgZone,
		private responsive: BreakpointObserver
	) {
		this.smallDevice = false;
	}

	/*
	** On component initialization, get all data from the data service.
	*/
	ngOnInit() {
		console.log("in init for wineries");
		// load all records
		this.getAllWineries();
		this.responsive.observe([
			Breakpoints.Handset,
			Breakpoints.HandsetLandscape,
			Breakpoints.HandsetPortrait,
			Breakpoints.Tablet,
			Breakpoints.TabletLandscape,
			Breakpoints.TabletPortrait
		])
			.subscribe(result => {

				this.smallDevice = false;

				if (result.matches) {
					this.smallDevice = true;
				}
			});
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