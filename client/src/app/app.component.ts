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

  add(){
    this.itemsService.createItem({description: 'test', price: 123})
      .subscribe(data => {
        console.log(data)
        this.itemList.push(data)
      })
  }

  remove(id: string){
    this.itemsService.deleteItem(id)
      .subscribe(data => {
        console.log(data)
        this.itemList = this.itemList.filter(item => item._id !== id)
      })
  }

  update(id: string, item: any){
    this.itemsService.updateItem(id, item)
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

  checkFields(){
    console.log('check fields');
    
  }
}
