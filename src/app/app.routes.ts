import { Routes } from '@angular/router';
import { ProductsListComponent } from './features/products/products-list/products-list.component';

export const routes: Routes = [
    {path:'', redirectTo:'products', pathMatch:'full'},
    {path:'products', loadComponent:()=>import('./features/products/products-list/products-list.component').then(c=>c.ProductsListComponent)},
    {path: 'products/:category', loadComponent:()=>import('./features/products/products-list/products-list.component').then(c=>c.ProductsListComponent)},
    {path:'product/:id', loadComponent:()=>import('./features/products/product-details/product-details.component').then(c=>c.ProductDetailsComponent)},
    {path: '**', loadComponent:()=>import('./shared/components/notfoundpage/notfoundpage.component').then(c=>c.NotfoundpageComponent)}
];
