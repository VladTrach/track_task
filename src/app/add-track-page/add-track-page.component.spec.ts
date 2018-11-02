import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrackPageComponent } from './add-track-page.component';

describe('AddTrackPageComponent', () => {
  let component: AddTrackPageComponent;
  let fixture: ComponentFixture<AddTrackPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrackPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
