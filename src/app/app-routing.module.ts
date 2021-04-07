import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddListingPageComponent } from './add-listing-page/add-listing-page.component';
import { HomeComponent } from './home/home.component';
import { BookPageComponent } from './book-page/book-page.component';
import { ClothingPageComponent } from './clothing-page/clothing-page.component';
import { FurniturePageComponent } from './furniture-page/furniture-page.component';
import { ElectronicsPageComponent } from './electronics-page/electronics-page.component';
import { SportsPageComponent } from './sports-page/sports-page.component';

const routes: Routes = [
  {path: 'app', component: AppComponent},
  {path: 'home', component: HomeComponent},
  {path: 'listing-page', component: AddListingPageComponent},
  {path: 'book-page', component: BookPageComponent},
  {path: 'clothing-page', component: ClothingPageComponent},
  {path: 'furniture-page', component: FurniturePageComponent},
  {path: 'electronics-page', component: ElectronicsPageComponent},
  {path: 'sports-page', component: SportsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
