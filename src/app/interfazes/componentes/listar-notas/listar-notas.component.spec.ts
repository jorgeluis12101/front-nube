import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNotasComponent } from './listar-notas.component';

describe('ListarNotasComponent', () => {
  let component: ListaNotasComponent;
  let fixture: ComponentFixture<ListaNotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaNotasComponent]
    });
    fixture = TestBed.createComponent(ListaNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
