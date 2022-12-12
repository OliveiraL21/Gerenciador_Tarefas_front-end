import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetosCadastroComponent } from './projetos-cadastro.component';

describe('ProjetosCadastroComponent', () => {
  let component: ProjetosCadastroComponent;
  let fixture: ComponentFixture<ProjetosCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetosCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
