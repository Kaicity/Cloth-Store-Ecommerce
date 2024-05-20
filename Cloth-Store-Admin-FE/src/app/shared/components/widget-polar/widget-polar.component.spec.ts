import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetPolarComponent } from './widget-polar.component';

describe('WidgetPolarComponent', () => {
  let component: WidgetPolarComponent;
  let fixture: ComponentFixture<WidgetPolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetPolarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WidgetPolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
