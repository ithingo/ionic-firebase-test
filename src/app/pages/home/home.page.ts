import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public bookList: Observable<Book[]>;

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.bookList = this.firestoreService
      .getAllBooks()
      .valueChanges();
  }

}
