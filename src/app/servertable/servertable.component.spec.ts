import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServertableComponent } from './servertable.component';

describe('ServertableComponent', () => {
  let component: ServertableComponent;
  let fixture: ComponentFixture<ServertableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServertableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServertableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
