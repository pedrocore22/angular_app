import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pantalla404Component } from './pantalla404.component';

describe('Pantalla404Component', () => {
  let component: Pantalla404Component;
  let fixture: ComponentFixture<Pantalla404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pantalla404Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pantalla404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
