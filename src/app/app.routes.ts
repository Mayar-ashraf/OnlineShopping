import { Routes } from '@angular/router';
import { ProductsListComponent } from './features/products/products-list/products-list.component';

export const routes: Routes = [
    {path:'', redirectTo:'products', pathMatch:'full'},
    {path:'products', loadComponent:()=>import('./features/products/products-list/products-list.component').then(c=>c.ProductsListComponent)},
    {path: 'products/:category', loadComponent:()=>import('./features/products/products-list/products-list.component').then(c=>c.ProductsListComponent)},
    {path:'product/:id', loadComponent:()=>import('./features/products/product-details/product-details.component').then(c=>c.ProductDetailsComponent)},
    {path:'checkout', loadComponent:()=>import('./features/checkout/checkout/checkout.component').then(c=>c.CheckoutComponent)},
    {path:'aboutUs', loadComponent:()=>import('./shared/components/aboutus/aboutus.component').then(c=>c.AboutusComponent)},
    {path:'cart', loadComponent:()=>import('./features/cart/cart/cart.component').then(c=>c.CartComponent)},
    {path: '**', loadComponent:()=>import('./shared/components/notfoundpage/notfoundpage.component').then(c=>c.NotfoundpageComponent)}
];
