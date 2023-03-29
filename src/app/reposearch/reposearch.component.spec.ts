import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposearchComponent } from './reposearch.component';

describe('ReposearchComponent', () => {
  let component: ReposearchComponent;
  let fixture: ComponentFixture<ReposearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReposearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReposearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
