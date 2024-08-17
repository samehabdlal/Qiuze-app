import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupjectsComponent } from './supjects.component';

describe('SupjectsComponent', () => {
  let component: SupjectsComponent;
  let fixture: ComponentFixture<SupjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
