import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreditosPage } from './creditos.page';

describe('CreditosPage', () => {
  let component: CreditosPage;
  let fixture: ComponentFixture<CreditosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
