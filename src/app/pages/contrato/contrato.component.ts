import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contrato',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css'
})
export class ContratoComponent {

  caminho = '/gestao-assinatura';
  contratoId: string | null = null;
  dynamicHeaderText = 'Contrato Nº';
  
  constructor(private route : ActivatedRoute) {}

  ngOnInit() {
    console.log("TESTE");
    
    this.contratoId = this.route.snapshot.paramMap.get('id');
    this.dynamicHeaderText = 'Contrato Nº ' + this.contratoId;
    
  }
}
