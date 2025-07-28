import { Component, Input } from '@angular/core';
import { IssuesItem } from '../../models/issues';
import {MatIconModule} from '@angular/material/icon';
import { DateTypes } from '../../types/record';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-issues-item',
  imports: [MatIconModule, CommonModule],
  templateUrl: './issues-item.html',
  styleUrl: './issues-item.css'
})
export class IssuesItemComponent {
  @Input() issues: IssuesItem[] = []

  getSafeDate(date: DateTypes|null) {
    if(!date) return '';
    if(date.days_ago == 0){
       let time = new Date(date.raw).toLocaleTimeString();
       const last_colon = time.lastIndexOf(':');
       time = time.slice(0, last_colon);
       return `${time}`;
    }

    return date.days_ago < 31 ? `${date.days_ago} days ago` : date.formatted;
  }

  getNotSoLongBody(body: string) {
    return body.length > 100 ? body.slice(0, 100) + '...' : body;
  }

}
