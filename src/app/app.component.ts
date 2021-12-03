import { Component, OnInit } from '@angular/core';
import { Menu } from './menu';
import { MenuService } from './menu.service';
import { Bill } from './bill';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public menus: Menu[];
  public editMenu: Menu;
  public deleteMenu: Menu;
  public bills: Bill[];
  public editBill: Bill;
  public deleteBill: Bill;
  item: string;
  quantity: number;
  imageUrl: string;
  totalPrice: number; 
  date: string;


  constructor(private menuService: MenuService){}

  ngOnInit() {
    this.getMenus();
    this.getBills();
  }

  public getMenus(): void {
    this.menuService.getMenus().subscribe(
      (response: Menu[]) => {
        this.menus = response;
        console.log(this.menus);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddMenu(addForm: NgForm): void {
    document.getElementById('add-menu-form').click();
    this.menuService.addMenu(addForm.value).subscribe(
      (response: Menu) => {
        console.log(response);
        this.getMenus();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateMenu(menu: Menu): void {
    this.menuService.updateMenu(menu).subscribe(
      (response: Menu) => {
        console.log(response);
        this.getMenus();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteMenu(menuId: number): void {
    this.menuService.deleteMenu(menuId).subscribe(
      (response: void) => {
        console.log(response);
        this.getMenus();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchMenus(key: string): void {
    console.log(key);
    const results: Menu[] = [];
    for (const menu of this.menus) {
      if (menu.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || menu.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || menu.note.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(menu);
      }
    }
    this.menus = results;
    if (results.length === 0 || !key) {
      this.getMenus();
    }
  }

  public onOpenModal(menu: Menu, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addMenuModal');
    }
    if (mode === 'edit') {
      this.editMenu = menu;
      button.setAttribute('data-target', '#updateMenuModal');
    }
    if (mode === 'delete') {
      this.deleteMenu = menu;
      button.setAttribute('data-target', '#deleteMenuModal');
    }
    container.appendChild(button);
    button.click();
  }


public getBills(): void {
    this.menuService.getBills().subscribe(
      (response: Bill[]) => {
        this.bills = response;
        console.log(this.bills);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

public onAddBill(addBillForm: NgForm): void {
    document.getElementById('add-bill-form').click();
    this.menuService.addBill(addBillForm.value).subscribe(
      (response: Bill) => {
        console.log(response);
        this.getBills();
        addBillForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addBillForm.reset();
      }
    );
  }

  public onUpdatebBill(bill: Bill): void {
    this.menuService.updateBill(bill).subscribe(
      (response: Bill) => {
        console.log(response);
        this.getBills();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteBill(billId: number): void {
    this.menuService.deleteBill(billId).subscribe(
      (response: void) => {
        console.log(response);
        this.getBills();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchBills(key: string): void {
    console.log(key);
    const results: Bill[] = [];
    for (const bill of this.bills) {
      if (bill.item.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || bill.date.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(bill);
      }
    }
    this.bills = results;
    if (results.length === 0 || !key) {
      this.getBills();
    }
  }

  public onOpenBillModal(bill: Bill, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'addBill') {
      button.setAttribute('data-target', '#addBillModal');
    }
    if (mode === 'editBill') {
      this.editBill = bill;
      button.setAttribute('data-target', '#updateBillModal');
    }
    if (mode === 'deleteBill') {
      this.deleteBill = bill;
      button.setAttribute('data-target', '#deleteBillModal');
    }
    container.appendChild(button);
    button.click();
  }
}
