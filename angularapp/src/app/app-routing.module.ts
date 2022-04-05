import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { YourGuardGuard } from './your-guard.guard';

const routes: Routes = [
  { path: 'register', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [YourGuardGuard],
    // children: [
    //   {
    //     path: ':id',
    //     component: ProductDetailsComponent,
    //   },
    // ],
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    canActivate: [YourGuardGuard],
  },
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
