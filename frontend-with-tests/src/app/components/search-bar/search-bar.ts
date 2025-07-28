import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();

  searchQuery: string = '';
  isLoading: boolean = false;
  hasSearched: boolean = false;

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      this.searchEvent.emit(this.searchQuery.trim());
    }
  }



  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  setLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  setHasSearched(hasSearched: boolean): void {
    this.hasSearched = hasSearched;
  }
}
