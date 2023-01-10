import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '@core/models/employee';
import { DataService } from '@services/data.service';
import { ActivatedRoute } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit, OnDestroy {
  columns: string[] = [
    'name',
    'salary',
    'phone',
    'email',
    'date',
    'country',
    'company',
  ];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource();
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  @ViewChild('pagination', { static: true }) pagination!: MatPaginator;
  @ViewChild(MatSort) tableSort!: MatSort;
  searchVal: string = '';
  $subs: Subscription[] = [];
  employeeList: Employee[] = [];
  filters: boolean = true;
  filtersIncluded: boolean = false;
  constructor(
    private dataService: DataService,
    private activatedRouter: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.setupSearch();
    this.activatedRouter.queryParamMap.subscribe((res) => {
      this.filtersIncluded = res.keys.length > 0;
      this.getEmployeesList();
    });
  }
  getEmployeesList() {
    const sub = this.dataService.getEmployees().subscribe((res) => {
      this.employeeList = res;
      if (this.filtersIncluded) {
        this.doFilters();
      }
      this.setupTable(this.employeeList);
    });
    this.$subs.push(sub);
  }
  doFilters() {
    let filteredEmployees: Employee[] = [];
    this.activatedRouter.snapshot.queryParamMap.keys.forEach((key) => {
      let emp = this.employeeList.filter((em: any) =>
        em[key]
          .toLowerCase()
          .includes(
            this.activatedRouter.snapshot.queryParamMap.get(key)?.toLowerCase()
          )
      );
      filteredEmployees.push(...emp);
    });
    this.employeeList = filteredEmployees.filter(
      (a, i) => filteredEmployees.findIndex((s) => a.id === s.id) === i
    );
  }
  setupTable(employees: Employee[]) {
    this.dataSource = new MatTableDataSource(employees);
    this.dataSource.paginator = this.pagination;
    this.dataSource.sort = this.tableSort;
  }
  setupSearch() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(filter(Boolean), debounceTime(1000), distinctUntilChanged())
      .subscribe((res) => {
        this.filterEmployees();
      });
  }
  filterEmployees() {
    this.dataSource.filter = this.searchVal.toLowerCase().trim();
    this.dataSource.paginator?.firstPage();
  }
  toggleFilters() {
    this.filters = !this.filters;
    this.dataService.filtersOpen.next(this.filters);
  }
  ngOnDestroy(): void {
    this.$subs.forEach((s) => s.unsubscribe());
  }
}
