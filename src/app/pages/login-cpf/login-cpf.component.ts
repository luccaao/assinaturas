import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
  selector: 'app-login-cpf',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-cpf.component.html',
  styleUrl: './login-cpf.component.css'
})
export class LoginCPFComponent {
  cpfForm: FormGroup;
  isInvalid: boolean = false; // Flag para controlar o estado de invalidez

  constructor(private fb: FormBuilder, private router: Router, private auth: AutenticacaoService) {
    this.cpfForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/)]]
    });
  }

  ngOnInit() {
     this.auth.getTokens().subscribe(data => {
       console.log(data);
    });

    
    

  }

  onSubmit() {
    const cpfControl = this.cpfForm.get('cpf');
    if (cpfControl && this.validarCPF(cpfControl.value.replace(/\D/g, ''))) {
      console.log('CPF válido:', cpfControl.value);
      this.isInvalid = false;
      this.router.navigate(['/gestao-assinatura']);

    } else {
      this.setInvalidState();
    }
  }

  onBlur() {
    const cpfControl = this.cpfForm.get('cpf');
    if (cpfControl) {
      const cpfValue = cpfControl.value.replace(/\D/g, ''); 
      if (!this.validarCPF(cpfValue)) {
        this.setInvalidState();
      } else {
        this.isInvalid = false;
      }
    }
  }

  onFocus() {
    const cpfControl = this.cpfForm.get('cpf');
    if (cpfControl && cpfControl.value === 'Entrada Inválida') {
      cpfControl.setValue('');
      this.isInvalid = false; 
    }
  }

  setInvalidState() {
    const cpfControl = this.cpfForm.get('cpf');
    if (cpfControl) {
      cpfControl.setValue('Entrada Inválida');
      this.isInvalid = true; 
    }
  }

  validarCPF(cpf: string): boolean {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10), 10)) {
      return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11), 10)) {
      return false;
    }

    return true;
  }

  get cpf() {
    return this.cpfForm.get('cpf');
  }


}