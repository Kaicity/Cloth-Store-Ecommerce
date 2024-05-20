import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSalesComponent } from './widget-sales.component';

describe('WidgetSalesComponent', () => {
  let component: WidgetSalesComponent;
  let fixture: ComponentFixture<WidgetSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WidgetSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
