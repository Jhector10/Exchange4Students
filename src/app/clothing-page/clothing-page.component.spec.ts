import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingPageComponent } from './clothing-page.component';

describe('ClothingPageComponent', () => {
  let component: ClothingPageComponent;
  let fixture: ComponentFixture<ClothingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
