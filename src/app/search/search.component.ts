import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../core/api.service";
import {Repo} from "../model/repo.model"

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  repositories: Repo[] = [];
  count: number = 0;
  search: string;
  gitHubSearchForm: FormGroup;
  timeoutId: number = 0;
  isSearching: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.gitHubSearchForm = this.formBuilder.group({
      search: ['', [Validators.minLength(3), Validators.required]]
    })
  }

  doSearch(): void {
    this.apiService.searchRepo(this.gitHubSearchForm.controls.search.value)
      .subscribe( data => {
        console.log(data)
        this.count = data.total_count;
        this.repositories = data.items.map(o => {return {id: o.id, name: o.name, stargazers_count: o.stargazers_count}});
        this.isSearching = false;
      })
  };

  
  onSearchChange(): void {
    clearTimeout(this.timeoutId);
    if (this.gitHubSearchForm.valid) {
      this.isSearching = true;
      this.timeoutId = window.setTimeout(() => this.doSearch(), 400);
    } else {
      this.repositories = [];
      this.isSearching = false;
    }
  }

}
