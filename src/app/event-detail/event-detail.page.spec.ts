import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventDetailPage } from './event-detail.page';

describe('EventDetailPage', () => {
  let component: EventDetailPage;
  let fixture: ComponentFixture<EventDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
