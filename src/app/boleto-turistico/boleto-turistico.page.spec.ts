import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoletoTuristicoPage } from './boleto-turistico.page';

describe('BoletoTuristicoPage', () => {
  let component: BoletoTuristicoPage;
  let fixture: ComponentFixture<BoletoTuristicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletoTuristicoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoletoTuristicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
