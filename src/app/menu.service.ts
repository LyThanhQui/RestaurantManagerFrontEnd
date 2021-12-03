import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from './menu';
import { Bill } from './bill';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class MenuService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiServerUrl}/menu/all`);
  }

  public addMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(`${this.apiServerUrl}/menu/add`, menu);
  }

  public updateMenu(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiServerUrl}/menu/update`, menu);
  }

  public deleteMenu(menuId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/menu/delete/${menuId}`);
  }


  public getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiServerUrl}/bill/all`);
  }

  public addBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(`${this.apiServerUrl}/bill/add`, bill);
  }

  public updateBill(bill: Bill): Observable<Bill> {
    return this.http.put<Bill>(`${this.apiServerUrl}/bill/update`, bill);
  }

  public deleteBill(billId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/bill/delete/${billId}`);
  }
}
