import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaginaXxxPage } from './pagina-xxx.page';

describe('PaginaXxxPage', () => {
  let component: PaginaXxxPage;
  let fixture: ComponentFixture<PaginaXxxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaXxxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaXxxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
