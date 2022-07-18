import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpMemberComponent } from './sign-up-member.component';

describe('SignUpMemberComponent', () => {
  let component: SignUpMemberComponent;
  let fixture: ComponentFixture<SignUpMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
