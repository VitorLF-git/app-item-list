import { Component } from '@angular/core';
import { ItemsService } from './services/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  itemList: any[] = []
  description: string = ''
  dueDate: string = ''
  priority: string = ''

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.itemsService.getAllItems()
      .subscribe(data => {
        console.log(data)
        this.itemList = data
      })
  }

  add(description: any, dueDate: any, priority: any) {
    console.log(dueDate);

    this.itemsService.createItem({ description: description, dueDate: dueDate, priority: priority })
      .subscribe(data => {
        console.log(data)
        this.itemList.push(data)
      })
    this.description = ''
    this.dueDate = ''
    this.priority = ''
  }

  remove(id: string) {
    this.itemsService.deleteItem(id)
      .subscribe(data => {
        console.log(data)
      })
    this.itemList = this.itemList.filter(item => item.item_id !== id)
  }

  update(id: string, item: any) {
    this.itemsService.updateItem(id, { description: item.description, dueDate: item.due_date, priority: item.priority })
      .subscribe(data => {
        console.log(data)
        this.itemList = this.itemList.map(item => {
          if (item._id === id) {
            return data
          }
          return item
        })
      })
  }

  checkFields() {
    if (this.description === '' || this.dueDate === '' || this.priority === '') {
      return true
    } else {
      return false
    }

  }
}
