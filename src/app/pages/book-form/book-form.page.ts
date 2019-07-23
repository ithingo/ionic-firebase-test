import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/data/firestore.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.page.html',
  styleUrls: ['./book-form.page.scss'],
})
export class BookFormPage implements OnInit {
  private bookId: string;

  public bookForm: FormGroup;
  public editMode: boolean = false;

  private setBookToBeUpdated(): void {
    this.firestoreService
      .getBook(this.bookId)
      .valueChanges()
      .subscribe(data => {
        const formConfig = {
          title: data.title,
          author: data.author,
          publishedYear: data.publishedYear, 
        };
        this.bookForm.setValue(formConfig);
      });
  }

  constructor(
    private loadingCtrl: LoadingController,
    private firestoreService: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId != null) {
      this.bookId = bookId;
      this.editMode = true;
    }
  }

  public ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      publishedYear: new FormControl('', Validators.required),
    });
    if (this.editMode) { this.setBookToBeUpdated(); }
  }

  public async createBook(): Promise<any> {
    const loading = await this.loadingCtrl.create();
    const bookData = this.bookForm.value;

    const actionPromise = this.editMode
      ? this.firestoreService.updateBook(this.bookId, bookData)
      : this.firestoreService.createBook(bookData);
    actionPromise
      .then(() => loading.dismiss())
      .then(() => this.router.navigate(['']))
      .catch((err) => console.error(err));

    return await loading.present();
  }

}
