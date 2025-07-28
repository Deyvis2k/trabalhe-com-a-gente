import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { NavigatePagesComponent } from './navigate-pages';
import { RepositoryItem } from '../../models/repository';
import { IssuesItem } from '../../models/issues';

describe('NavigatePagesComponent', () => {
  let component: NavigatePagesComponent;
  let fixture: ComponentFixture<NavigatePagesComponent>;

  const mockRepositories: RepositoryItem[] = [
    {
      full_name: 'test/repo1',
      description: 'Test repository 1',
      language: 'TypeScript',
      url: 'https://github.com/test/repo1',
      created_at: { raw: '2023-01-01T00:00:00Z', formatted: 'Jan 1, 2023', days_ago: 365 },
      updated_at: { raw: '2024-01-01T00:00:00Z', formatted: 'Jan 1, 2024', days_ago: 0 },
      avatar_url: 'https://github.com/user.png',
      stargazers_count: 100,
      forks: 50,
      open_issues: 10,
      name_and_repo: { name: 'test', repo: 'repo1' }
    }
  ];

  const mockIssues: IssuesItem[] = [
    {
      url: 'https://api.github.com/repos/test/repo/issues/1',
      repository_url: 'https://api.github.com/repos/test/repo',
      user: { login: 'testuser', id: 123, avatar_url: 'https://github.com/testuser.png' },
      created_at: { raw: '2024-01-01T10:30:00Z', formatted: 'Jan 1, 2024', days_ago: 0 },
      updated_at: { raw: '2024-01-01T10:30:00Z', formatted: 'Jan 1, 2024', days_ago: 15 },
      closed_at: null,
      score: 1.0,
      title: 'Test Issue',
      body: 'Test issue description'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigatePagesComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigatePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.slicedRepositories).toEqual([]);
    expect(component.repositories).toEqual([]);
    expect(component.issues).toEqual([]);
    expect(component.slicedIssues).toEqual([]);
    expect(component.currentPage).toBe(1);
    expect(component.currentTab).toBe('repositories');
  });

  describe('totalPages getter', () => {
    it('should return slicedRepositories length when currentTab is repositories', () => {
      component.currentTab = 'repositories';
      component.slicedRepositories = [mockRepositories, mockRepositories];
      expect(component.totalPages).toBe(2);
    });

    it('should return slicedIssues length when currentTab is not repositories', () => {
      component.currentTab = 'issues';
      component.slicedIssues = [mockIssues, mockIssues, mockIssues];
      expect(component.totalPages).toBe(3);
    });
  });

  describe('totalPagesArray getter', () => {
    it('should return array of page numbers', () => {
      component.slicedRepositories = [mockRepositories, mockRepositories, mockRepositories];
      component.currentTab = 'repositories';
      expect(component.totalPagesArray).toEqual([1, 2, 3]);
    });

    it('should return empty array when no pages', () => {
      component.slicedRepositories = [];
      component.currentTab = 'repositories';
      expect(component.totalPagesArray).toEqual([]);
    });
  });

  describe('goToPage', () => {
    it('should emit onNavigatePages event with page number', () => {
      spyOn(component.onNavigatePages, 'emit');
      component.goToPage(3);
      expect(component.onNavigatePages.emit).toHaveBeenCalledWith(3);
    });
  });

  describe('goToNextPage', () => {
    it('should emit onNextPage when not on last page', () => {
      spyOn(component.onNextPage, 'emit');
      component.currentPage = 2;
      component.slicedRepositories = [mockRepositories, mockRepositories, mockRepositories];
      component.currentTab = 'repositories';
      
      component.goToNextPage();
      
      expect(component.onNextPage.emit).toHaveBeenCalled();
    });

    it('should not emit onNextPage when on last page', () => {
      spyOn(component.onNextPage, 'emit');
      component.currentPage = 3;
      component.slicedRepositories = [mockRepositories, mockRepositories, mockRepositories];
      component.currentTab = 'repositories';
      
      component.goToNextPage();
      
      expect(component.onNextPage.emit).not.toHaveBeenCalled();
    });
  });

  describe('goToPreviousPage', () => {
    it('should emit onPreviousPage when not on first page', () => {
      spyOn(component.onPreviousPage, 'emit');
      component.currentPage = 2;
      
      component.goToPreviousPage();
      
      expect(component.onPreviousPage.emit).toHaveBeenCalled();
    });

    it('should not emit onPreviousPage when on first page', () => {
      spyOn(component.onPreviousPage, 'emit');
      component.currentPage = 1;
      
      component.goToPreviousPage();
      
      expect(component.onPreviousPage.emit).not.toHaveBeenCalled();
    });
  });

  describe('visiblePages getter', () => {
    it('should return all pages when totalPages is 10 or less', () => {
      component.slicedRepositories = Array(5).fill(mockRepositories);
      component.currentTab = 'repositories';
      
      expect(component.visiblePages).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return first 7 pages with ellipsis when currentPage is 6 or less and totalPages > 10', () => {
      component.slicedRepositories = Array(15).fill(mockRepositories);
      component.currentTab = 'repositories';
      component.currentPage = 3;
      
      expect(component.visiblePages).toEqual([1, 2, 3, 4, 5, 6, 7, '...', 15]);
    });

    it('should return last 7 pages with ellipsis when currentPage is close to end', () => {
      component.slicedRepositories = Array(15).fill(mockRepositories);
      component.currentTab = 'repositories';
      component.currentPage = 12;
      
      expect(component.visiblePages).toEqual([1, '...', 8, 9, 10, 11, 12, 13, 14, 15]);
    });

    it('should return middle pages with ellipsis on both sides', () => {
      component.slicedRepositories = Array(20).fill(mockRepositories);
      component.currentTab = 'repositories';
      component.currentPage = 10;
      
      expect(component.visiblePages).toEqual([1, '...', 8, 9, 10, 11, 12, '...', 20]);
    });
  });
});
