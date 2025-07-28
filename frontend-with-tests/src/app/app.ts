import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar';
import { SearchResultsComponent } from './components/search-results/search-results';
import { GithubService } from './services/github';
import { RepositoryItem } from './models/repository';
import { SearchFilterComponent } from './components/search-filter/search-filter';
import { TypeOfSort, TypeOfOrder } from './services/github';
import { IssuesItem } from './models/issues';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SearchBarComponent, SearchResultsComponent, SearchFilterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  @ViewChild(SearchResultsComponent) searchResultsComponent!: SearchResultsComponent;
  @ViewChild(SearchBarComponent) searchBarComponent!: SearchBarComponent;
  @ViewChild(SearchFilterComponent) searchFilterComponent!: SearchFilterComponent;


  title = 'GitHub Repository Search';
  repositories: Array<RepositoryItem> = [];
  slicedRepositories: Array<Array<RepositoryItem>> = [];
  slicedIssues: Array<Array<IssuesItem>> = [];
  currentPage: number = 1;
  totalCount: number = 0;
  totalIssues: number = 0;
  isLoading: boolean = false;
  hasSearched: boolean = false;
  currentQuery: string = '';
  languages: string[] = [];
  oldQuery: string = '';
  issues: IssuesItem[] = [];
  hasAlreadyLoadedIssue: boolean = false;

  constructor(private githubService: GithubService, private cdr: ChangeDetectorRef) {}

  onSearch(query: string, sort?: TypeOfSort, order?: TypeOfOrder): void {
    console.log("Busca feita")
    this.isLoading = true;
    this.hasSearched = true;
    this.currentQuery = query;
    this.currentPage = 1;

    this.githubService.searchRepositories(query, sort, order).subscribe({
      next: (response) => {
        if(!response.items.length){
           this.notFoundHandler()
        }
          this.searchResultsComponent.currentTab = 'repositories';
         this.hasSearchedHandler(response, query);
      },
      error: (error) => {
        console.error('Search error occurred:', error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url
        });
        this.notFoundHandler();
      }
    });
  }

  private notFoundHandler() {
    this.repositories = [];
    this.slicedRepositories = [];
    this.totalCount = 0;
    this.isLoading = false;
    this.searchBarComponent.setLoading(false);
    this.searchBarComponent.setHasSearched(true);
    this.cdr.detectChanges();
  }

  private hasSearchedHandler(response: any, query: string) {
    if(response.items.length < 10){
        this.repositories = response.items;
      }
      this.slicedRepositories = this.getSlicedArrays(response.items);
      console.log(this.slicedRepositories)
      this.totalIssues = response.total_issues;
      this.repositories = this.slicedRepositories[this.currentPage - 1] || [];
      this.totalCount = response.total_count;
      this.isLoading = false;
      this.searchBarComponent.setLoading(false);
      this.searchBarComponent.setHasSearched(true);
      if(query != this.oldQuery){
        this.filterLanguages();
      }
      if(this.searchFilterComponent){
          this.searchFilterComponent.repositories = this.repositories;
          this.searchFilterComponent.languages = this.languages;
      }
      this.oldQuery = query;
      this.cdr.detectChanges();
  }

  private getSlicedArrays<T>(array2: T[]): T[][] {
    const totalSliced = Math.ceil(array2.length / 10);
    const sliced: T[][] = [];

    for (let i = 0; i < totalSliced; i++) {
      sliced.push(array2.slice(i * 10, (i + 1) * 10));
    }

    return sliced;
  }


  filterLanguages() {
    this.languages = this.repositories
      .map((repo) => repo.language)
      .filter((language, index, array) => (language !== null && language.trim() !== '') && array.indexOf(language) === index);
  }

  onFilterChange(filter: { sort: TypeOfSort; order: TypeOfOrder }): void {
      this.currentPage = 1;
      if (this.currentQuery) {
        this.onSearch(this.currentQuery, filter.sort, filter.order);
      }
  }

  onNavigatePages(page: number) {
    if(this.searchResultsComponent.currentTab == 'issues'){
      this.currentPage = page;
      this.searchResultsComponent.issues = this.searchResultsComponent.slicedIssues[this.currentPage - 1] || [];
    } else{
        this.currentPage = page;
        this.repositories = this.slicedRepositories[page - 1];
    }
  }

  onNextPage() {
    if(this.searchResultsComponent.currentTab == 'issues'){
      this.currentPage++;
      this.searchResultsComponent.issues = this.searchResultsComponent.slicedIssues[this.currentPage - 1] || [];
    } else{
        this.currentPage++;
        this.repositories = this.slicedRepositories[this.currentPage - 1];
    }
  }

  onPreviousPage() {
    if(this.searchResultsComponent.currentTab == 'issues'){
      this.currentPage--;
      this.searchResultsComponent.issues = this.searchResultsComponent.slicedIssues[this.currentPage - 1] || [];
    } else{
        this.currentPage--;
        this.repositories = this.slicedRepositories[this.currentPage - 1];
    }
  }

  onSearchIssues(query: string) {
    this.hasAlreadyLoadedIssue = true;
    this.githubService.searchIssues(query).subscribe({
      next: (response) => {
        if(response.items.length < 10){
           this.searchResultsComponent.issues = response.items;
        }
        this.searchResultsComponent.slicedIssues = this.getSlicedArrays(response.items);
        this.searchResultsComponent.issues = this.searchResultsComponent.slicedIssues[this.currentPage - 1] || [];

        console.log(
          `Issues: ${this.searchResultsComponent.issues.length}
          Sliced Issues: ${this.searchResultsComponent.slicedIssues.length}`
        );
        this.isLoading = false;
        this.searchBarComponent.setLoading(false);
        this.searchBarComponent.setHasSearched(true);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Search error occurred:', error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url
        });
        this.notFoundHandler();
      }
    })
  }

  setActiveTab(event: {
    tab: string;
    query: string;
    sort?: TypeOfSort;
    order?: TypeOfOrder;
  })
  {
    if(event.tab == this.searchResultsComponent.currentTab) return;



    if(event.tab == 'repositories' && event.query != this.currentQuery) {
      this.searchResultsComponent.currentTab = 'repositories';
      this.currentPage = 1;
      this.onSearch(event.query, event.sort, event.order);
    } else if(event.tab == 'repositories') {
      this.searchResultsComponent.currentTab = 'repositories';
    }


    if(event.tab == 'issues' && !this.hasAlreadyLoadedIssue && this.totalIssues > 0) {
      this.isLoading = false;
      this.searchResultsComponent.currentTab = 'issues';
      this.currentPage = 1;
      this.onSearchIssues(event.query);
    } else if (event.tab == 'issues' && this.totalIssues > 0) {
      this.currentPage = 1;
      this.searchResultsComponent.currentTab = 'issues';
    }
  }
}
