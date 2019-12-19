import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlogArticuloPage } from './blog-articulo.page';

describe('BlogArticuloPage', () => {
  let component: BlogArticuloPage;
  let fixture: ComponentFixture<BlogArticuloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogArticuloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlogArticuloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
