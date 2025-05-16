import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmcodeComponent } from './confirmcode.component';

describe('ConfirmcodeComponent', () => {
  let component: ConfirmcodeComponent;
  let fixture: ComponentFixture<ConfirmcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmcodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
