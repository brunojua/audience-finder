import { Component, OnInit } from '@angular/core';

import { FacebookApiService } from './../services/facebook-api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavmenuComponent implements OnInit {

  keyword: string;
  keyword_exibicao: string;
  lista: any = {data: []};
  buscando: boolean = false;
  busca_realizada: boolean = false;

  constructor(
    private fbapi: FacebookApiService
  ) { }

  ngOnInit(): void {
  }

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
                this.buscando = false;
				this.busca_realizada = true;
				this.lista = res;
			}
		);
	}
}
