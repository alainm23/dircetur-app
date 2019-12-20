import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrcDetallePage } from './trc-detalle.page';

describe('TrcDetallePage', () => {
  let component: TrcDetallePage;
  let fixture: ComponentFixture<TrcDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrcDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrcDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
