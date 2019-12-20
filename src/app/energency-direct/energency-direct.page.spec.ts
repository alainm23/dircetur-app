import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnergencyDirectPage } from './energency-direct.page';

describe('EnergencyDirectPage', () => {
  let component: EnergencyDirectPage;
  let fixture: ComponentFixture<EnergencyDirectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergencyDirectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnergencyDirectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
