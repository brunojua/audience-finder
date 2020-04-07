import { Component, OnInit } from '@angular/core';

import { FacebookApiService } from './../services/facebook-api.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	lista: any;

	constructor(private fbapi: FacebookApiService) { }

	ngOnInit(): void {
		this.listarDados();
	}

	listarDados() {
		this.fbapi.getDados().subscribe(
			res => {
				console.log(res);
				this.lista = res;
			}
		);
	}

}
