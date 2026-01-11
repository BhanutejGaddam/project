import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceStatusComponent } from './edit-service-status.component';

describe('EditServiceStatusComponent', () => {
  let component: EditServiceStatusComponent;
  let fixture: ComponentFixture<EditServiceStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditServiceStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditServiceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
