import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TurismoCircuitoPage } from './turismo-circuito.page';

describe('TurismoCircuitoPage', () => {
  let component: TurismoCircuitoPage;
  let fixture: ComponentFixture<TurismoCircuitoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurismoCircuitoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TurismoCircuitoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
