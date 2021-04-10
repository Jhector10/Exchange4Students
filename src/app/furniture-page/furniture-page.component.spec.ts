import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurniturePageComponent } from './furniture-page.component';

describe('FurniturePageComponent', () => {
  let component: FurniturePageComponent;
  let fixture: ComponentFixture<FurniturePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurniturePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FurniturePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
