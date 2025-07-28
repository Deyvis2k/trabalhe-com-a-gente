import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { SearchFilterComponent } from './search-filter';
import { TypeOfSort, TypeOfOrder } from '../../services/github';

describe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFilterComponent, FormsModule, CommonModule, MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.repositories).toEqual([]);
    expect(component.sort).toBe(TypeOfSort.Stars);
    expect(component.order).toBe(TypeOfOrder.DESC);
    expect(component.languages).toEqual([]);
    expect(component.activeTab).toBe('repositories');
    expect(component.totalRepositories).toBe(0);
    expect(component.currentQuery).toBe('');
  });

  it('should emit filterChange event on apply filter', () => {
    spyOn(component.filterChange, 'emit');
    component.sort = TypeOfSort.Created;
    component.order = TypeOfOrder.ASC;

    component.onApplyFilter();

    expect(component.filterChange.emit).toHaveBeenCalledWith({
      sort: TypeOfSort.Created,
      order: TypeOfOrder.ASC
    });
  });

  it('should emit setActiveTab event on set active', () => {
    spyOn(component.setActiveTab, 'emit');

    component.setActive('issues', 'testQuery', TypeOfSort.Stars, TypeOfOrder.DESC);

    expect(component.setActiveTab.emit).toHaveBeenCalledWith({
      tab: 'issues',
      query: 'testQuery',
      sort: TypeOfSort.Stars,
      order: TypeOfOrder.DESC
    });
  });

  it('should call setActive without sort and order parameters', () => {
    spyOn(component.setActiveTab, 'emit');

    component.setActive('repositories', 'testQuery');

    expect(component.setActiveTab.emit).toHaveBeenCalledWith({
      tab: 'repositories',
      query: 'testQuery',
      sort: undefined,
      order: undefined
    });
  });

  it('should return correct style for language', () => {
    const result = component.styleDotLanguage('javascript');
    expect(result).toBeDefined();
  });

  it('should handle empty language in styleDotLanguage', () => {
    const result = component.styleDotLanguage('');
    expect(result).toBeDefined();
  });

  it('should update sort property', () => {
    component.sort = TypeOfSort.Updated;
    expect(component.sort).toBe(TypeOfSort.Updated);
  });

  it('should update order property', () => {
    component.order = TypeOfOrder.ASC;
    expect(component.order).toBe(TypeOfOrder.ASC);
  });

});
