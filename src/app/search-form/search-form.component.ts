import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  constructor() {}

  form: FormGroup;
  text: string;

  ngOnInit(): void {
    this.form = new FormGroup({
      text: new FormControl('', Validators.required),
    });
  }

  search() {}
}
