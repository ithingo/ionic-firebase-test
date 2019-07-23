import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/data/firestore.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.page.html',
  styleUrls: ['./create-book.page.scss'],
})
export class CreateBookPage implements OnInit {
  private editMode: boolean = false;
  private bookId: string;
  public bookForm: FormGroup;

  // @FIXME: temporarily doesn't work
  private setBookToBeUpdated(): void {
    this.firestoreService
      .getBook(this.bookId)
      .valueChanges()
      .toPromise()
      .then(data => {
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
    if (this.editMode) {
      this.setBookToBeUpdated();
    }
  }

  public async createBook(): Promise<any> {
    const loading = await this.loadingCtrl.create();
    const bookData = this.bookForm.value;

    this.firestoreService
      .createBook(bookData)
      .then(() => loading.dismiss())
      .then(() => this.router.navigate(['']))
      .catch((err) => console.error(err));

    return await loading.present();
  }

}
