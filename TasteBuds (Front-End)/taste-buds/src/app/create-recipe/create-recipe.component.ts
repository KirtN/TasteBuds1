import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { setEngine } from 'crypto';



@Component({
  selector: 'app-create-recipe',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css',
  encapsulation: ViewEncapsulation.None
})

export class CreateRecipeComponent implements OnInit {
  PROTOCOL = "https";
  LOCAL_IP = "localhost";
  LOCAL_PORT = "7067";

  ingredientForm = new FormControl('');
  ingredientList: string[] = [];
  allSelected = false;

  ngOnInit() {
    if(sessionStorage.getItem("logged_in") === null || sessionStorage.getItem("logged_in") == "false") {
      window.location.href = "/profile";
    }

    // Prepare dropdown filter
    let ingredient_ids = JSON.parse(sessionStorage.getItem("ingredient_ids")!);
    for(let i = 0; i < ingredient_ids.length; i++) {
      fetch(`${this.PROTOCOL}://${this.LOCAL_IP}:${this.LOCAL_PORT}/ingredient/${ingredient_ids[i]}`)
      .then((response) => response.json())
      .then((ingredient) => {
        this.ingredientList.push(ingredient.ingredient_name);
      });
    }

    

    // Load recipes
    const pantryButton: HTMLElement = document.getElementById("pantryButton") as HTMLElement;
    const recipeButton: HTMLElement = document.getElementById("recipeButton") as HTMLElement;
    const profileButton: HTMLElement = document.getElementById("profileButton") as HTMLElement;
    pantryButton.setAttribute("style", "background-color:#282828 !important");
    recipeButton.setAttribute("style", "background-color:#42463f !important");
    profileButton.setAttribute("style", "background-color:#282828 !important");

    this.loadRecipes();
  }

  loadRecipes() {
    fetch(`${this.PROTOCOL}://${this.LOCAL_IP}:${this.LOCAL_PORT}/recipe`)
    .then((response) => response.json())
    .then((recipe) => {
      // Create a recipe div for each recipe in the database
      for(let i = 0; i < recipe.length; i++) {
        const background: HTMLElement = document.getElementById("background") as HTMLElement;
        let elem = document.createElement("div");
        elem.id = "recipe"+recipe[i].recipe_id;
        elem.classList.add("recipe");
        elem.innerHTML = recipe[i].recipe_name;
        elem.onclick = (e) => {
          this.openIngredientsList();
          this.showRecipeDetails(i+1, recipe[i].recipe_name, recipe[i].is_Vegan, recipe[i].is_Vegetarian, recipe[i].is_GlutenFree);
        }
        background.appendChild(elem);
      }
    });
  }

  showRecipeDetails(id: number, recipe_name: string, is_Vegan: boolean, is_Vegetarian: boolean, is_GlutenFree: boolean) {
    const ingredient_ids: number[] = [];
    const quantities: number[] = [];
    const measurements: string[] = [];
    fetch(`${this.PROTOCOL}://${this.LOCAL_IP}:${this.LOCAL_PORT}/recipe_ingredient_junction`)
    .then((response) => response.json())
    .then((ingredients) => {
      for(let i = 0; i < ingredients.length; i++) {
        if(id == ingredients[i].recipe_id) {
          ingredient_ids.push(ingredients[i].ingredient_id);
          quantities.push(ingredients[i].quantity);
          measurements.push(ingredients[i].quantity_measurement);

          // Create ingredient top bar
          const bar: HTMLElement = document.getElementById("recipeName") as HTMLElement;
          bar.innerHTML = recipe_name;
          
          // Colour icons
          if(is_Vegan) {
            const icon: HTMLElement = document.getElementById("veganIcon") as HTMLElement;
            icon.setAttribute("style", "color:green");
          } else {
            const icon: HTMLElement = document.getElementById("veganIcon") as HTMLElement;
            icon.setAttribute("style", "color:red");
          }
          
          if(is_Vegetarian) {
            const icon: HTMLElement = document.getElementById("vegetarianIcon") as HTMLElement;
            icon.setAttribute("style", "color:green");
          } else {
            const icon: HTMLElement = document.getElementById("vegetarianIcon") as HTMLElement;
            icon.setAttribute("style", "color:red");
          }

          if(is_GlutenFree) {
            const icon: HTMLElement = document.getElementById("glutenFreeIcon") as HTMLElement;
            icon.setAttribute("style", "color:green");
          } else {
            const icon: HTMLElement = document.getElementById("glutenFreeIcon") as HTMLElement;
            icon.setAttribute("style", "color:red");
          }


        }
      }
    })
    .then(() => {
      // Get ingredient names
      while(ingredient_ids.length > 0) {
        let quantity = quantities.pop();
        let measurement = measurements.pop();
        fetch(`${this.PROTOCOL}://${this.LOCAL_IP}:${this.LOCAL_PORT}/ingredient/${ingredient_ids.pop()}`)
        .then((response) => response.json())
        .then((ingredients) => {
          // Add ingredients screen on top
          const list: HTMLElement = document.getElementById("ingredientList") as HTMLElement;
          let elem = document.createElement("li");
          elem.classList.add("ingredient-item");
          elem.innerHTML = quantity + " " + measurement + " " + ingredients.ingredient_name;
          list.appendChild(elem);
        });
      }
    });
  }

  closeIngredientsList() {
    const pane: HTMLElement = document.getElementById("ingredientsPane") as HTMLElement;
    const backButton: HTMLElement = document.getElementById("backButton") as HTMLElement;
    const ingredient = document.getElementsByClassName("ingredient-item");
    pane.setAttribute("style", "visibility:hidden");
    backButton.setAttribute("style", "visibility:hidden");
    
    // reset ingredient list
    const list: HTMLElement = document.getElementById("ingredientList") as HTMLElement;
    while(ingredient.length > 0) {
      list.removeChild(ingredient[0]);
    }

  }
  
  openIngredientsList() {
    // Create ingredient pane
    const pane: HTMLElement = document.getElementById("ingredientsPane") as HTMLElement;
    const backButton: HTMLElement = document.getElementById("backButton") as HTMLElement;
    pane.setAttribute("style", "visibility:visible");
    backButton.setAttribute("style", "visibility:visible");
  }

  openFilterMenu() {
    let selectedIngredients = this.ingredientForm.value;
    let selectedIngredientIds : number[] = [];
    if(selectedIngredients !== null && selectedIngredients.length > 0) {
      // Get selected ingredient ids
      fetch(`${this.PROTOCOL}://${this.LOCAL_IP}:${this.LOCAL_PORT}/ingredient`)
      .then((response) => response.json())
      .then((ingredient) => {
        for(let i = 0; i < ingredient.length; i++) {
          for(let j = 0; j < selectedIngredients.length; j++) {
            if(ingredient[i].ingredient_name == selectedIngredients[j]) {
              selectedIngredientIds.push(ingredient[i].ingredient_id);
              break;
            }
          }
        }

        // Get recipes that match ingredients
        fetch(`${this.PROTOCOL}://${this.LOCAL_IP}:${this.LOCAL_PORT}/recipe_ingredient_junction`)
        .then((response) => response.json())
        .then((recipe_ingredient_junction) => {
          fetch(`${this.PROTOCOL}://${this.LOCAL_IP}:${this.LOCAL_PORT}/recipe`)
          .then((response) => response.json())
          .then((recipe) => {
            var recipe_added = 0;
            // Remove recipes
            const background: HTMLElement = document.getElementById("background") as HTMLElement;
            let count = 1;
            while(background.childElementCount > 2) {
              const recipe: HTMLElement = document.getElementById("recipe"+count) as HTMLElement;
              background.removeChild(recipe);
              count++;
            }
            for(let i = 0; i < recipe.length; i++) {
              let num_found = 0;
              let recipe_id = recipe[i].recipe_id;

              for(let i = 0; i < recipe_ingredient_junction.length; i++) {
                for(let j = 0; j < selectedIngredientIds.length; j++) {
                  if(recipe_ingredient_junction[i].recipe_id == recipe_id && recipe_ingredient_junction[i].ingredient_id == selectedIngredientIds[j]) {
                    num_found++;
                  }
                }
              }

              if(num_found > 0) {
                recipe_added += 1;
                let elem = document.createElement("div");
                elem.id = "recipe"+recipe_added;
                elem.classList.add("recipe");
                elem.innerHTML = recipe[i].recipe_name;
                elem.onclick = (e) => {
                  this.openIngredientsList();
                  this.showRecipeDetails(i+1, recipe[i].recipe_name, recipe[i].is_Vegan, recipe[i].is_Vegetarian, recipe[i].is_GlutenFree);
                }
                background.appendChild(elem);

              }
            }

          });
        });
      });
    } else {
      // Clear filtered recipes
      const background: HTMLElement = document.getElementById("background") as HTMLElement;
      let count = 1;
      while(background.childElementCount > 2) {
        const recipe: HTMLElement = document.getElementById("recipe"+count) as HTMLElement;
        background.removeChild(recipe);
        count++;
      }
      this.loadRecipes();
    }
  }
}
