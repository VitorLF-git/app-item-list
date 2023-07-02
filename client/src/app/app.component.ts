import { Component } from '@angular/core';
import { ItemsService } from './services/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.itemsService.getAllItems()
      .subscribe(data => {
        console.log(data)
      })
  }
}
