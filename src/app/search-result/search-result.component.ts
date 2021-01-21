import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  text: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (routeParams) => (this.text = routeParams.text)
    );
  }
}
