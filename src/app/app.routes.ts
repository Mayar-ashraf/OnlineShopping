import { Routes } from '@angular/router';
import { ProductsListComponent } from './features/products/products-list/products-list.component';

export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', loadComponent:()=>import('./features/products/products-list/products-list.component').then(c=>c.ProductsListComponent)}
];
