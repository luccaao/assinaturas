import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCPFComponent } from './login-cpf.component';

describe('LoginCPFComponent', () => {
  let component: LoginCPFComponent;
  let fixture: ComponentFixture<LoginCPFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCPFComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginCPFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
