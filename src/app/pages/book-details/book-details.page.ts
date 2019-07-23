import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { FirestoreService } from 'src/app/services/data/firestore.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  private bookId: string;
  public book: Observable<Book>;
  public isClosing: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
  ) { }

  private deleteBookHandler(bookId): void {
    this.firestoreService
      .deleteBook(bookId)
      .then(() => {
        this.isClosing = true;
        this.router.navigate(['']);
      });
  }

  public ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    this.book = this.firestoreService
      .getBook(this.bookId)
      .valueChanges();
  }

  public async deleteBook(): Promise<void> {
    const modalConfig = {
      message: 'Are you sure you wanna delete the book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'OK',
          handler: () => this.deleteBookHandler(this.bookId),
        },
      ]
    };
    const modal = await this.alertController.create(modalConfig);
    await modal.present();
  }

}
