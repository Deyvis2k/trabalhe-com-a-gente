import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryItem } from '../../models/repository';
import { RepositoryItemComponent } from '../repository-item/repository-item';
import { NavigatePagesComponent } from '../navigate-pages/navigate-pages';
import { IssuesItem } from '../../models/issues';
import {IssuesItemComponent} from "../issues-item/issues-item";

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, RepositoryItemComponent, NavigatePagesComponent, IssuesItemComponent],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css'
})
export class SearchResultsComponent {
  currentQuery: string = '';

  @ViewChild('navigatePages') navigatePagesComponent?: NavigatePagesComponent;

  @Input() repositories: RepositoryItem[] = [];
  @Input() totalCount: number = 0;
  @Input() isLoading: boolean = false;
  @Input() hasSearched: boolean = false;
  @Input() currentPage: number = 1;
  @Input() slicedRepositories: RepositoryItem[][] = [];
  @Input() currentTab: string = 'repositories';
  @Input() totalIssues: number = 0;
  issues: IssuesItem[] = [];
  slicedIssues: Array<Array<IssuesItem>> = [];

  @Output() onNavigatePages = new EventEmitter<number>();
  @Output() onNextPage = new EventEmitter<void>();
  @Output() onPreviousPage = new EventEmitter<void>();

  handleNavigatePages(page: number): void {this.onNavigatePages.emit(page)}
  handleNextPage(): void {this.onNextPage.emit()}
  handlePreviousPage(): void {this.onPreviousPage.emit()}
}
