import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-contrato',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css'
})
export class ContratoComponent {

  dynamicHeaderText = 'Contrato';
  caminho = '/gestao-assinatura';
}
