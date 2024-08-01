import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/modal/modal.component';
import { GoogleDriveService } from '../../services/google-drive.service';
import { RouterLink } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';

interface Apolice {
  nome: string;
  cnpj_cpf: string;
  email: string;
  contato_telefone: string;
  apolice_id: string;
  apolice_status_id: string;
  parceiro: string;

  // Adicione outros campos conforme necessário
}

interface DadosCliente {
  apolice: [{
    apolice_id: string;
    apolice_status_id: string;
    nome: string;
    cnpj_cpf: string;
    email: string;
    contato_telefone: string;
    parceiro: string;
  }]
}
@Component({
  selector: 'app-gestao-assinatura',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ModalComponent, RouterLink],
  templateUrl: './gestao-assinatura.component.html',
  styleUrl: './gestao-assinatura.component.css'
})
export class GestaoAssinaturaComponent {
  
  dynamicHeaderText = 'Gestão de Assinaturas';
  caminho = '/login-cpf';

  dadosCliente!: DadosCliente[]  

  dadosDetalhados! : Apolice[]
   
  

  selectedButton: string = 'pendentes'; // Define o botão inicial como 'pendentes'

  showModal: boolean = false; // Flag para controlar a exibição do modal

  constructor (private driveService: GoogleDriveService, private auth: AutenticacaoService) {}

  variables = {
    var1 : '',
    var2 : '',
  };

 

  selectButton(button: string) {
    this.selectedButton = button;
    console.log('Botão selecionado:', button);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

 
  ngOnInit(): void {
    this.loadGoogleApis();
    
    this.auth.apolices('86352055532').subscribe(data => {
      this.dadosCliente = data.dados; 
      console.log(this.dadosCliente);    
      
    });
  }

  loadGoogleApis() {
    this.driveService.loadGapi();
    this.driveService.loadGis();
  }

  handleAuthClick() {
    this.driveService.handleAuthClick();
  }

  handleSignoutClick() {
    this.driveService.handleSignoutClick();
  }

  copyFile(fileId: string, newFileName: string) {
    this.driveService.copyFile(fileId, newFileName, this.variables);
  }

  getFirstName(nome: string): string {
    const nomes = nome.split(' ');
    return nomes.slice(0, 2).join(' ');
  }

  formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatPhoneNumber(telefone: string): string {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}
