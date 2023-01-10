import { Component, OnInit } from '@angular/core';
import { DataService } from '../../@services/data.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({transform: 'translateX(100%)', opacity: 0}),
        animate('1s', style({transform: 'translateX(0)', opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(0)', opacity: 1}),
        animate('1s', style({transform: 'translateX(100%)', opacity: 0}))
      ])
    ]),
  ],
})
export class EmployeesComponent implements OnInit {
  openFilter: boolean = false;
  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.filtersOpen.subscribe((res) => (this.openFilter = res));
  }
}
