import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CircuitoDetallePage } from './circuito-detalle.page';

describe('CircuitoDetallePage', () => {
  let component: CircuitoDetallePage;
  let fixture: ComponentFixture<CircuitoDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitoDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CircuitoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
