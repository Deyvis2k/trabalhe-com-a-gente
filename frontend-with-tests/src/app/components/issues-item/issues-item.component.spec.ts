import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { IssuesItemComponent } from './issues-item';
import { IssuesItem } from '../../models/issues';
import { DateTypes } from '../../types/record';

describe('IssuesItemComponent', () => {
  let component: IssuesItemComponent;
  let fixture: ComponentFixture<IssuesItemComponent>;

  const mockIssues: IssuesItem[] = [
    {
      url: 'https://api.github.com/repos/test/repo/issues/1',
      repository_url: 'https://api.github.com/repos/test/repo',
      user: {
        login: 'testuser',
        id: 123,
        avatar_url: 'https://github.com/testuser.png'
      },
      created_at: {
        raw: '2024-01-01T10:30:00Z',
        formatted: 'Jan 1, 2024',
        days_ago: 0
      },
      updated_at: {
        raw: '2024-01-01T10:30:00Z',
        formatted: 'Jan 1, 2024',
        days_ago: 15
      },
      closed_at: null,
      score: 1.0,
      title: 'Test Issue',
      body: 'This is a test issue description that is longer than 100 characters to test the getNotSoLongBody method properly and see how it handles long text.'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuesItemComponent, MatIconModule, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(IssuesItemComponent);
    component = fixture.componentInstance;
    component.issues = mockIssues;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty issues array', () => {
    const newComponent = TestBed.createComponent(IssuesItemComponent).componentInstance;
    expect(newComponent.issues).toEqual([]);
  });

  it('should accept issues input', () => {
    expect(component.issues).toEqual(mockIssues);
  });

  describe('getSafeDate', () => {
    it('should return empty string when date is null', () => {
      const result = component.getSafeDate(null);
      expect(result).toBe('');
    });

    it('should return formatted time when days_ago is 0', () => {
      const dateToday: DateTypes = {
        raw: '2024-01-01T14:30:45Z',
        formatted: 'Jan 1, 2024',
        days_ago: 0
      };

      const result = component.getSafeDate(dateToday);

      expect(result).toMatch(/^\d{1,2}:\d{2}$/);
      expect(result).not.toMatch(/:\d{2}:\d{2}$/);
    });

    it('should return "X days ago" when days_ago is less than 31', () => {
      const dateRecent: DateTypes = {
        raw: '2024-01-01T00:00:00Z',
        formatted: 'Jan 1, 2024',
        days_ago: 20
      };

      const result = component.getSafeDate(dateRecent);
      expect(result).toBe('20 days ago');
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

  describe('getNotSoLongBody', () => {
    it('should return original body when length is 100 or less', () => {
      const shortBody = 'This is a short description';
      const result = component.getNotSoLongBody(shortBody);
      expect(result).toBe(shortBody);
    });

    it('should truncate body and add ellipsis when length is more than 100', () => {
      const longBody = 'This is a very long description that exceeds 100 characters and should be truncated to show only the first 100 characters with an ellipsis at the end';
      const result = component.getNotSoLongBody(longBody);

      expect(result).toBe(longBody.slice(0, 100) + '...');
      expect(result.length).toBe(103); // 100 chars + '...'
    });

    it('should handle empty body', () => {
      const result = component.getNotSoLongBody('');
      expect(result).toBe('');
    });

    it('should handle body with exactly 100 characters', () => {
      const exactBody = 'a'.repeat(100);
      const result = component.getNotSoLongBody(exactBody);
      expect(result).toBe(exactBody);
    });

    it('should handle body with 101 characters', () => {
      const body101 = 'a'.repeat(101);
      const result = component.getNotSoLongBody(body101);
      expect(result).toBe('a'.repeat(100) + '...');
    });
  });

  it('should render issues correctly', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement).toBeTruthy();
  });
});
