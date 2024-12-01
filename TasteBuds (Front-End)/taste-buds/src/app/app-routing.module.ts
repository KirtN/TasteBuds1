import { PantryComponent } from './pantry/pantry.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'profile', pathMatch: 'full'},
    {path: 'pantry', component: PantryComponent},
    {path: 'create-recipe', component: CreateRecipeComponent},
    {path: 'profile', component: ProfileComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }