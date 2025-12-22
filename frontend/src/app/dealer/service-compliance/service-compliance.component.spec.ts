import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceComplianceComponent } from './service-compliance.component';

describe('ServiceComplianceComponent', () => {
  let component: ServiceComplianceComponent;
  let fixture: ComponentFixture<ServiceComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceComplianceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
