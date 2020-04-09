import { Component, OnInit } from '@angular/core';

import { FacebookApiService } from './../services/facebook-api.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	lista: any = {data: []};
    buscando: boolean = false;

	constructor(private fbapi: FacebookApiService) { }

	ngOnInit(): void {
		
	}

	getDados() {
        this.buscando = true;

		this.fbapi.getDados().subscribe(
			res => {
				console.log(res);
				this.lista = res;
                
                this.buscando = false;
			}
		);
	}

}
