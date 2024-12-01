import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-pantry',
  imports: [],
  templateUrl: './pantry.component.html',
  styleUrl: './pantry.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PantryComponent implements OnInit {
  PROTOCOL = "https";
  LOCAL_IP = "localhost";
  LOCAL_PORT = "7067";
  
  ngOnInit() {
    const pantryButton: HTMLElement = document.getElementById("pantryButton") as HTMLElement;
    const recipeButton: HTMLElement = document.getElementById("recipeButton") as HTMLElement;
    const profileButton: HTMLElement = document.getElementById("profileButton") as HTMLElement;
    pantryButton.setAttribute("style", "background-color:#42463f !important");
    recipeButton.setAttribute("style", "background-color:#282828 !important");
    profileButton.setAttribute("style", "background-color:#282828 !important");

    // Get user to log in if not already
    if(sessionStorage.getItem("logged_in") === null || sessionStorage.getItem("logged_in") == "false") {
      window.location.href = "/profile";
    }

    // Load pantry items
    this.loadPantry();
  }

  loadPantry() {
    const pantryIngredientIds: number[] = [];
    const pantryQuantity: number[] = [];
    const pantryMeasurement: string[] = [];
    fetch(`${this.PROTOCOL}://${this.LOCAL_IP}:${this.LOCAL_PORT}/pantry`)
    .then((response) => response.json())
    .then((pantry) => {
      let user_id = JSON.parse(sessionStorage.getItem("user")!).user_id;

      for(let i = 0; i < pantry.length; i++) {
        if(user_id == pantry[i].user_id) {
          pantryIngredientIds.push(pantry[i].ingredient_id);
          pantryQuantity.push(pantry[i].quantity);
          pantryMeasurement.push(pantry[i].measurement);
        }
      }

      const pantryIngredients: string[] = [];
      fetch(`${this.PROTOCOL}://${this.LOCAL_IP}:${this.LOCAL_PORT}/ingredient`)
      .then((response) => response.json())
      .then((ingredients) => {
        for(let i = 0; i < ingredients.length; i++) {
          for(let j = 0; j < pantryIngredientIds.length; j++) {
            if(pantryIngredientIds[j] == ingredients[i].ingredient_id) {
              pantryIngredients.push(ingredients[i].ingredient_name);
              break;
            }
          }
        }

        // Build pantry list
        for(let i = 0; i < pantryIngredients.length; i++) {
          const pantryContainer: HTMLElement = document.getElementById("pantryContainer") as HTMLElement;
          let ingredientContainer = document.createElement('div');
          ingredientContainer.classList.add("ingredient-container");
          ingredientContainer.setAttribute("id", "ingredient" + i);
          
          let name = document.createElement('div');
          name.classList.add("ingredient-name");
          name.innerHTML = pantryIngredients[i];

          let quantity = document.createElement('input');
          quantity.classList.add("ingredient-quantity");
          quantity.setAttribute("type","number");
          quantity.setAttribute("id", "quantity" + i)
          quantity.onkeyup = (e) => {
            switch (e.key) {
              case '1':
              case '2':
              case '3':
              case '4':
              case '5':
              case '6':
              case '7':
              case '8':
              case '9':
              case '0':
                this.enableButton();
                break;
              default:
                if(e.key == "Backspace" || e.key == "Delete") {
                  this.enableButton();
                }
            }
          }
          quantity.value = pantryQuantity[i].toString();

          let measurement = document.createElement('div');
          measurement.classList.add("ingredient-measurement");
          measurement.setAttribute("id", "measurement"+i);
          measurement.innerHTML = pantryMeasurement[i];
          
          ingredientContainer.appendChild(name);
          ingredientContainer.appendChild(quantity);
          ingredientContainer.appendChild(measurement);

          pantryContainer.appendChild(ingredientContainer);
        }

      })
    })
  }

  updatePantry() {
    const root: HTMLElement = document.getElementById("pantryContainer") as HTMLElement;
    const ingredient_ids = JSON.parse(sessionStorage.getItem("ingredient_ids")!);
    const user_id = JSON.parse(sessionStorage.getItem("user")!).user_id; 
    for(let i = 0; i < root.childElementCount; i++) {
      let quantityElement: HTMLInputElement = document.getElementById("quantity"+i) as HTMLInputElement;
      let measurementElement: HTMLElement = document.getElementById("measurement"+i) as HTMLElement;

      // PUT request
      const headers: Headers = new Headers()
      headers.set('Content-Type', 'application/json')
      headers.set('Accept', 'application/json')
      let ingredient_id = ingredient_ids[i];
      let quantity = quantityElement.value;
      let measurement = measurementElement.innerHTML;
      fetch(`${this.PROTOCOL}://${this.LOCAL_IP}:${this.LOCAL_PORT}/pantry?user_id=${user_id}&ingredient_id=${ingredient_id}&quantity=${quantity}&measurement=${measurement}`, {
        method: 'PUT',
        headers: headers,
      });
    }
    

    const button: HTMLElement = document.getElementById("updateButton") as HTMLElement;
    button.setAttribute("disabled","");
  }

  enableButton() {
    const button: HTMLElement = document.getElementById("updateButton") as HTMLElement;
    button.removeAttribute("disabled");
  }
}
