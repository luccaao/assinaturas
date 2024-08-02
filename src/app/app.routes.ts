import { Routes } from '@angular/router';
import { LoginCPFComponent } from './pages/login-cpf/login-cpf.component';
import { GestaoAssinaturaComponent } from './pages/gestao-assinatura/gestao-assinatura.component';
import { ContratoComponent } from './pages/contrato/contrato.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login-cpf',
        pathMatch: 'full'
    },
    
    {
        path: 'login-cpf',
        component: LoginCPFComponent
    },
    {
        path: 'gestao-assinatura',
        component: GestaoAssinaturaComponent
    },
    {
        path: 'contrato/:id',
        component: ContratoComponent
    }
];
