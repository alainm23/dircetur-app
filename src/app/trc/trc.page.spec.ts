import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrcPage } from './trc.page';

describe('TrcPage', () => {
  let component: TrcPage;
  let fixture: ComponentFixture<TrcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
