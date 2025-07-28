import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryItem } from '../../models/repository';
import { DateTypes } from '../../types/record';
import { styleDotLanguage } from '../../types/const_values';

@Component({
  selector: 'app-repository-item',
  imports: [CommonModule],
  templateUrl: './repository-item.html',
  styleUrl: './repository-item.css'
})

class RepositoryItemComponent {
  @Input() repository!: RepositoryItem;

  getSafeDate(date: DateTypes) {
    if(date.days_ago == 0){
       let time = new Date(date.raw).toLocaleTimeString();
       const last_colon = time.lastIndexOf(':');
       time = time.slice(0, last_colon);
       return `${time}`;
    }

    return date.days_ago < 31 ? `${date.days_ago} days ago` : date.formatted;
  }

  setLanguageStyle(language: string) {
    return styleDotLanguage(language);
  }
}

export { RepositoryItemComponent };
