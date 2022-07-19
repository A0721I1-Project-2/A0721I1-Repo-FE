import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHomeComponent } from './show-home.component';

describe('ShowHomeComponent', () => {
  let component: ShowHomeComponent;
  let fixture: ComponentFixture<ShowHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
