import { Component, OnInit } from '@angular/core';
import { FacebookApiService } from './../services/facebook-api.service';

import Swal from 'sweetalert2'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	lista: any = {data: []};
	buscando: boolean = false;
	keyword: string;
	erro_keyword: boolean = false;
	busca_realizada: boolean = false;
	keyword_exibicao: string;

	constructor(private fbapi: FacebookApiService) { }

	ngOnInit(): void {}

	getDados() {	
		
		if(!this.keyword) {
			Swal.fire({				
				icon: 'warning',
				text: 'Informe uma palavra chave para Pesquisa',
				showConfirmButton: true,
				confirmButtonText: 'Fechar'
			});

			return;
		}

		this.keyword_exibicao = this.keyword;

		this.lista.data = [];
		this.buscando = true;
		
		this.fbapi.getDados(this.keyword).subscribe(
			res => {
				console.log(res);
                this.buscando = false;
				this.busca_realizada = true;
				this.lista = res;
			}
		);
	}

}
