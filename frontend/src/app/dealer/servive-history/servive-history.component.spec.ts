import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiveHistoryComponent } from './servive-history.component';

describe('ServiveHistoryComponent', () => {
  let component: ServiveHistoryComponent;
  let fixture: ComponentFixture<ServiveHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiveHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
