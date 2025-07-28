import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeOfSort, TypeOfOrder } from "../../services/github";
import { RepositoryItem } from "../../models/repository";
import { styleDotLanguage} from '../../types/const_values';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './search-filter.html',
  styleUrls: ['./search-filter.css'],
})
export class SearchFilterComponent {
  repositories: RepositoryItem[] = [];
  sort: TypeOfSort = TypeOfSort.Stars;
  order: TypeOfOrder = TypeOfOrder.DESC;
  languages: string[] = [];
  @Input() activeTab: string = 'repositories';
  @Input() totalRepositories: number = 0;
  @Input() currentQuery: string = '';

  styleDotLanguage(language: string) {
    return styleDotLanguage(language);
  }

  @Output() filterChange = new EventEmitter<{ sort: TypeOfSort; order: TypeOfOrder }>();
  @Input() totalIssues: number = 0;
  @Output() setActiveTab = new EventEmitter<{ tab: string; query: string; sort?: TypeOfSort; order?: TypeOfOrder }>();

  constructor() {

  }

  setActive(tab: string, query: string, sort?: TypeOfSort, order?: TypeOfOrder) {
    this.setActiveTab.emit({ tab: tab, query: query, sort: sort, order: order });
  }

  onApplyFilter() {
    this.filterChange.emit({ sort: this.sort, order: this.order });
  }


}
