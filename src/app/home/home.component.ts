import { Component, OnInit } from '@angular/core';
import { FacebookApiService } from './../services/facebook-api.service';
import { UtilsService } from '../utils';
// import { window } from 'rxjs/operators';

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


	caixaSelecao: any = [];
	limpandoSelecao: boolean = false;

	constructor(private fbapi: FacebookApiService, public utils: UtilsService) { }

	ngOnInit(): void {}

	getDados() {
		console.log(this.keyword);				
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
			},
			error => {
				this.buscando = false;
				this.busca_realizada = true;
				
				Swal.fire({				
					icon: 'error',
					text: 'Erro ao realizar busca',
					showConfirmButton: true,
					confirmButtonText: 'Fechar'
				});
			}
		);
	}

	copiarInteresses() {

		if(!this.caixaSelecao.length) {
			this.utils.toastErro('Não há interesses selecionados');
			return;
		}

		let arrayNomes = [];
		let stringFinal = null;

		this.caixaSelecao.map(interesse => {
			arrayNomes.push(interesse.name);
		});

		stringFinal = arrayNomes.toString();

		let selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = stringFinal;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
		
		this.utils.toastSucesso('Copiado');
	}

	copiarInteresse(interesse: any) {		
		let selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = interesse;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
		
		this.utils.toastSucesso('Copiado');
	}

	exportarInteresses() {

	}

	limparSelecao() {
		if(!this.caixaSelecao.length) {
			this.utils.toastErro('Não há interesses selecionados');
			return;
		}

		this.limpandoSelecao = true;

		this.caixaSelecao = [];

		this.lista.data.map(interesse => {
			if(interesse.marcado) {
				interesse.marcado = false;
			}
		});

		setTimeout(() => {
			this.limpandoSelecao = false;			
		}, 700);
	}

	addInteresseASelecao(interesse: any, index: any) {
		if(this.lista.data[index].marcado) {
			this.caixaSelecao.push(interesse);
		} else {
			this.caixaSelecao.splice(this.caixaSelecao.indexOf(interesse), 1);
		}		
	}

	removerInteresseCaixaSelecao(interesse: any, index: any) {
		this.caixaSelecao.splice(index, 1);
		
		let idx = this.lista.data.indexOf(interesse);				

		this.lista.data[idx].marcado = false;		
	}

	pesquisarAudienceFinder(interesse: any) {
		this.keyword = interesse.name;

		this.getDados();

		// window.scrollTo(0, 0);
	}

	pesquisarFacebook(interesse: any) {
		let query = 'https://www.facebook.com/search/top/?q=' + interesse.name;
		
		window.open(query, "_blank");
	}

	pesquisarGoogle(interesse: any) {		
		let url = 'https://www.google.com/search?sxsrf=ALeKk0254jSkLRMJLUSIe9Pzx0ovLI3v6Q%3A1587599634784&source=hp&ei=EtmgXvriLOKG0Ab196i4Dw&q=';	

		let url_final = url + interesse.name;

		window.open(url_final, "_blank");
	}
}
