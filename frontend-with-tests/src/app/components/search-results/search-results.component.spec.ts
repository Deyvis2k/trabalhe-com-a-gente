import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results';
import { RepositoryItemComponent } from '../repository-item/repository-item';
import { NavigatePagesComponent } from '../navigate-pages/navigate-pages';
import { IssuesItemComponent } from '../issues-item/issues-item';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchResultsComponent,
        CommonModule,
        RepositoryItemComponent,
        NavigatePagesComponent,
        IssuesItemComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.currentQuery).toBe('');
    expect(component.repositories).toEqual([]);
    expect(component.totalCount).toBe(0);
    expect(component.isLoading).toBe(false);
    expect(component.hasSearched).toBe(false);
    expect(component.currentPage).toBe(1);
    expect(component.slicedRepositories).toEqual([]);
    expect(component.currentTab).toBe('repositories');
    expect(component.totalIssues).toBe(0);
    expect(component.issues).toEqual([]);
    expect(component.slicedIssues).toEqual([]);
  });

  it('should emit event on handleNavigatePages', () => {
    spyOn(component.onNavigatePages, 'emit');
    component.handleNavigatePages(2);
    expect(component.onNavigatePages.emit).toHaveBeenCalledWith(2);
  });

  it('should emit event on handleNextPage', () => {
    spyOn(component.onNextPage, 'emit');
    component.handleNextPage();
    expect(component.onNextPage.emit).toHaveBeenCalled();
  });

  it('should emit event on handlePreviousPage', () => {
    spyOn(component.onPreviousPage, 'emit');
    component.handlePreviousPage();
    expect(component.onPreviousPage.emit).toHaveBeenCalled();
  });

});
