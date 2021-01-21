import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchResultComponent } from '../search-result/search-result.component';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  form: FormGroup;
  text: string;

  ngOnInit(): void {
    this.form = new FormGroup({
      text: new FormControl('', Validators.required),
    });
  }

  async search() {
    const product = await this.firebaseService.searchProduct(
      this.text?.toLowerCase()
    );

    if (product) {
      const fullRoute: string = await this.firebaseService.getFullRoute(
        product.lowestCategoryRoute
      );
      this.router.navigateByUrl(fullRoute);
    } else {
      this.router.navigate(['/search-result', { text: this.text }]);
    }
  }
}
