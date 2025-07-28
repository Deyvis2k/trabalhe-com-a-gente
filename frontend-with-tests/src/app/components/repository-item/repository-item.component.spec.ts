import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RepositoryItemComponent } from './repository-item';
import { RepositoryItem } from '../../models/repository';
import { DateTypes, NameAndRepo } from '../../types/record';

describe('RepositoryItemComponent', () => {
  let component: RepositoryItemComponent;
  let fixture: ComponentFixture<RepositoryItemComponent>;

  const mockRepository: RepositoryItem = {
    full_name: 'test/repository',
    description: 'Test repository description',
    language: 'TypeScript',
    url: 'https://github.com/test/repository',
    created_at: {
      raw: '2023-01-01T00:00:00Z',
      formatted: 'Jan 1, 2023',
      days_ago: 365
    },
    updated_at: {
      raw: '2024-01-01T10:30:00Z',
      formatted: 'Jan 1, 2024',
      days_ago: 0
    },
    avatar_url: 'https://github.com/user.png',
    stargazers_count: 100,
    forks: 50,
    open_issues: 10,
    name_and_repo: {
      name: 'test',
      repo: 'repository'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryItemComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryItemComponent);
    component = fixture.componentInstance;
    component.repository = mockRepository;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept repository input', () => {
    expect(component.repository).toEqual(mockRepository);
  });

  describe('getSafeDate', () => {
    it('should return formatted time when days_ago is 0', () => {
      const dateToday: DateTypes = {
        raw: '2024-01-01T14:30:00Z',
        formatted: 'Jan 1, 2024',
        days_ago: 0
      };

      const result = component.getSafeDate(dateToday);
      console.log(result);
      expect(result).toMatch(/^\d{1,2}:\d{2}$/);
      expect(result).not.toMatch(/:\d{2}:\d{2}$/);
    });

    it('should return "X days ago" when days_ago is less than 31', () => {
      const dateRecent: DateTypes = {
        raw: '2024-01-01T00:00:00Z',
        formatted: 'Jan 1, 2024',
        days_ago: 15
      };

      const result = component.getSafeDate(dateRecent);
      expect(result).toBe('15 days ago');
    });

    it('should return formatted date when days_ago is 31 or more', () => {
      const dateOld: DateTypes = {
        raw: '2023-01-01T00:00:00Z',
        formatted: 'Jan 1, 2023',
        days_ago: 365
      };

      const result = component.getSafeDate(dateOld);
      expect(result).toBe('Jan 1, 2023');
    });
  });

  describe('setLanguageStyle', () => {
    it('should return language style for given language', () => {
      const result = component.setLanguageStyle('TypeScript');
      expect(result).toBeDefined();
    });

    it('should handle empty language', () => {
      const result = component.setLanguageStyle('');
      expect(result).toBeDefined();
    });

    it('should handle different languages', () => {
      const jsResult = component.setLanguageStyle('JavaScript');
      const pyResult = component.setLanguageStyle('Python');
      const javaResult = component.setLanguageStyle('Java');

      expect(jsResult).toBeDefined();
      expect(pyResult).toBeDefined();
      expect(javaResult).toBeDefined();
    });
  });

  it('should render repository data correctly', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement).toBeTruthy();
  });
});
