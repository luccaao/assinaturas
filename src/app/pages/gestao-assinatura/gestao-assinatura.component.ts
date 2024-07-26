import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';

import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-gestao-assinatura',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ModalComponent],
  templateUrl: './gestao-assinatura.component.html',
  styleUrl: './gestao-assinatura.component.css'
})
export class GestaoAssinaturaComponent {
  
  dynamicHeaderText = 'Gestão de Assinaturas';

  selectedButton: string = 'pendentes'; // Define o botão inicial como 'pendentes'

  showModal: boolean = false; // Flag para controlar a exibição do modal

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
}
