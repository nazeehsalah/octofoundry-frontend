import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FilterItem } from '@core/models/filter-item';
import { DataService } from '@services/data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  filters: FilterItem[] = [];
  form!: FormGroup;
  $subs: Subscription[] = [];
  params!: ParamMap;
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.queryParamMap;
    this.getFiltersList();
  }
  getFiltersList() {
    const data = this.dataService.getFiltersList().subscribe((res) => {
      this.filters = res;
      this.form = this.fb.group({});
      this.filters.forEach((filter) => {
        this.form.addControl(
          filter.title,
          new FormControl(
            this.params.get(filter.title.toLowerCase())
              ? this.params.get(filter.title.toLowerCase())
              : '',
            []
          )
        );
        if (filter.api) {
          const sub = this.dataService
            .getCustomDropdown(filter.api)
            .subscribe((res) => {
              filter.values = res;
            });
          this.$subs.push(sub);
        }
      });
    });
    this.$subs.push(data);
  }
  submit() {
    let params: any = {};
    Object.keys(this.form.value).forEach((k) => {
      if (this.form.value[k]) params[k.toLowerCase()] = this.form.value[k];
    });
    this.router.navigate([''], {
      queryParams: params,
    });
  }
  ngOnDestroy(): void {
    this.$subs.forEach((s) => s.unsubscribe());
  }
}
