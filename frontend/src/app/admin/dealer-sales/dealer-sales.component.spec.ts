import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerSalesComponent } from './dealer-sales.component';

describe('DealerSalesComponent', () => {
  let component: DealerSalesComponent;
  let fixture: ComponentFixture<DealerSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealerSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
