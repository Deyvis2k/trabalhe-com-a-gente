import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { SearchBarComponent } from './search-bar';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, FormsModule, CommonModule, MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.searchQuery).toBe('');
    expect(component.isLoading).toBe(false);
    expect(component.hasSearched).toBe(false);
  });

  it('should emit search event when onSearch is called with valid query', () => {
    spyOn(component.searchEvent, 'emit');
    component.searchQuery = 'angular';

    component.onSearch();

    expect(component.isLoading).toBe(true);
    expect(component.searchEvent.emit).toHaveBeenCalledWith('angular');
  });

  it('should not emit search event when query is empty or whitespace', () => {
    spyOn(component.searchEvent, 'emit');

    component.searchQuery = '';
    component.onSearch();
    expect(component.searchEvent.emit).not.toHaveBeenCalled();

    component.searchQuery = '   ';
    component.onSearch();
    expect(component.searchEvent.emit).not.toHaveBeenCalled();
  });

  it('should trim search query before emitting', () => {
    spyOn(component.searchEvent, 'emit');
    component.searchQuery = '  angular  ';

    component.onSearch();

    expect(component.searchEvent.emit).toHaveBeenCalledWith('angular');
  });

  it('should call onSearch when Enter key is pressed', () => {
    spyOn(component, 'onSearch');
    const event = new KeyboardEvent('keypress', { key: 'Enter' });

    component.onKeyPress(event);

    expect(component.onSearch).toHaveBeenCalled();
  });

  it('should not call onSearch when other keys are pressed', () => {
    spyOn(component, 'onSearch');
    const event = new KeyboardEvent('keypress', { key: 'Tab' });

    component.onKeyPress(event);

    expect(component.onSearch).not.toHaveBeenCalled();
  });

  it('should set loading state', () => {
    component.setLoading(true);
    expect(component.isLoading).toBe(true);

    component.setLoading(false);
    expect(component.isLoading).toBe(false);
  });

  it('should set hasSearched state', () => {
    component.setHasSearched(true);
    expect(component.hasSearched).toBe(true);

    component.setHasSearched(false);
    expect(component.hasSearched).toBe(false);
  });

  it('should bind searchQuery to input field', async () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    component.searchQuery = 'test query';
    fixture.detectChanges();

    await fixture.whenStable();

    expect(inputElement.nativeElement.value).toBe('test query');
  });

  it('should update searchQuery when input changes', () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.nativeElement.value = 'new query';
    inputElement.nativeElement.dispatchEvent(new Event('input'));

    expect(component.searchQuery).toBe('new query');
  });
});
