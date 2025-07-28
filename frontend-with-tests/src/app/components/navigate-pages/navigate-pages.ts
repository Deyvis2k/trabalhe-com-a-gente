import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryItem } from '../../models/repository';
import { IssuesItem } from '../../models/issues';

@Component({
  selector: 'app-navigate-pages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigate-pages.html',
  styleUrls: ['./navigate-pages.css']
})
export class NavigatePagesComponent {
  @Input() slicedRepositories: RepositoryItem[][] = [];
  @Input() repositories: RepositoryItem[] = [];
  @Input() issues: IssuesItem[] = [];
  @Input() slicedIssues: Array<Array<IssuesItem>> = [];
  @Input() currentPage: number = 1;
  @Input() currentTab: string = 'repositories';
  @Output() onNavigatePages = new EventEmitter<number>();
  @Output() onNextPage = new EventEmitter<void>();
  @Output() onPreviousPage = new EventEmitter<void>();

  get totalPages(): number {
    return this.currentTab === 'repositories' ? this.slicedRepositories.length : this.slicedIssues.length;
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  goToPage(page: any): void {
    this.onNavigatePages.emit(page);
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.onNextPage.emit();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.onPreviousPage.emit();
    }
  }

   get visiblePages(): (number | string)[] {
      const pages: (number | string)[] = [];

      if (this.totalPages < 1 || this.currentPage < 1 || this.currentPage > this.totalPages) {
        return [];
      }

      if (this.totalPages <= 10) {
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (this.currentPage <= 6) {
          const maxPage = Math.min(7, this.totalPages);
          for (let i = 1; i <= maxPage; i++) {
            pages.push(i);
          }
          if (maxPage < this.totalPages) {
            pages.push('...', this.totalPages);
          }
        } else if (this.currentPage >= this.totalPages - 5) {
          pages.push(1);
          if (this.totalPages - 6 > 1) {
            pages.push('...');
          }
          for (let i = Math.max(2, this.totalPages - 7); i <= this.totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          if (this.currentPage - 2 > 2) {
            pages.push('...');
          }
          for (let i = Math.max(2, this.currentPage - 2); i <= Math.min(this.currentPage + 2, this.totalPages - 1); i++) {
            pages.push(i);
          }
          if (this.currentPage + 2 < this.totalPages - 1) {
            pages.push('...');
          }
          pages.push(this.totalPages);
        }
      }

      return pages;
    }

}

