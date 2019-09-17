import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './route-guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { PostListComponent } from './post/post-list/post-list.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'list', component: PostListComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: './login/login.module#LoginModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
