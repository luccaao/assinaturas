import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoAssinaturaComponent } from './gestao-assinatura.component';

describe('GestaoAssinaturaComponent', () => {
  let component: GestaoAssinaturaComponent;
  let fixture: ComponentFixture<GestaoAssinaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestaoAssinaturaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestaoAssinaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
