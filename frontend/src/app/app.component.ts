import { Component, ViewChild } from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
import { ApiService } from './api.service';
import { FoodFighter, FoodNutrition } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('autocomplete1stFighter')
  autocomplete1stFighter!: AutoComplete;

  @ViewChild('autocomplete2ndFighter')
  autocomplete2ndFighter!: AutoComplete;

  selected1stFighter: FoodFighter = {} as FoodFighter;
  selected2ndFighter: FoodFighter = {} as FoodFighter;

  foodList: FoodNutrition[] = [];

  showMatchReport: boolean = false;

  matchReport: string = '';

  constructor(private apiService: ApiService) {}

  searchFoods(event: any) {
    this.apiService.getFoods(event.query).subscribe(
      (response: any) => {
        this.foodList = response;
      },
      err => {
        console.error(err);
      }
    );
  }

  getRandomAlphabet(): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  selectRandomFood(fighterNumber: number) {
    this.showMatchReport = false;
    this.apiService.getFoods(this.getRandomAlphabet()).subscribe(
      (response: any) => {
        this.foodList = response;
        const randomItem: FoodNutrition = this.foodList[Math.floor(Math.random() * this.foodList.length - 1)];
        this.createFoodFighter(randomItem, fighterNumber);
      },
      err => {
        console.log(err);
      }
    );
  }

  createFoodFighter(foodNutrition: FoodNutrition, fighterNumber: number) {
    const foodFighter: FoodFighter = {
      name: foodNutrition.name.fi,
      category: foodNutrition.ingredientClass.abbreviation.fi,
      health: +foodNutrition.energyKcal.toFixed(2),
      attack: +foodNutrition.carbohydrate.toFixed(2),
      defence: +foodNutrition.protein.toFixed(2),
      delay: +(foodNutrition.carbohydrate + foodNutrition.protein + foodNutrition.fat).toFixed(2)
    }

    if (fighterNumber === 1) {
      this.selected1stFighter = foodFighter;
      this.autocomplete1stFighter.inputEL.nativeElement.value = this.selected1stFighter.name;
    } else if (fighterNumber === 2) {
      this.selected2ndFighter = foodFighter;
      this.autocomplete2ndFighter.inputEL.nativeElement.value = this.selected2ndFighter.name;
    } else {
      console.error('fighterNumber ei ole oikein');
    }
  }

  autocompleteCleared(event: any, fighterNumber: number) {
    if (fighterNumber === 1) {
      if (this.selected1stFighter?.name !== event.srcElement.value) {
        this.clearSelectedFighter(1);
      }
    } else if (fighterNumber === 2) {
      if (this.selected2ndFighter?.name !== event.srcElement.value) {
        this.clearSelectedFighter(2);
      }
    } else {
      console.error('fighterNumber ei ole oikein');
    }
  }

  clearSelectedFighter(fighterNumber: number) {
    if (fighterNumber === 1) {
      this.selected1stFighter = {} as FoodFighter;
      this.autocomplete1stFighter.inputEL.nativeElement.value = '';
    } else if (fighterNumber === 2) {
      this.selected2ndFighter = {} as FoodFighter;
      this.autocomplete2ndFighter.inputEL.nativeElement.value = '';
    } else {
      console.error('fighterNumber ei ole oikein');
    }
    this.showMatchReport = false;
  }

  getTooltipForDisabledFightBtn(): string {
    if (!this.selected1stFighter.name || !this.selected2ndFighter.name) {
      return 'Valitse taistelija kummallekin puolelle';
    } else if (this.selected1stFighter.name === this.selected2ndFighter.name) {
      return 'Ruoat eivät lyö itseään...';
    }
    return '';
  }

  startMatch() {
    this.matchReport = '';

    let fighter1Health = this.selected1stFighter.health;
    let fighter2Health = this.selected2ndFighter.health;

    let fighter1Delays = [];
    let fighter2Delays = [];

    // Creating list of delays for fighter1
    for (let i = 1; i <= 1000; i++) {
      fighter1Delays.push({
        name: 'fighter1',
        delay: +(this.selected1stFighter.delay * i).toFixed(2)
      });
    }

    // Creating list of delays for fighter2
    for (let i = 1; i <= 1000; i++) {
      fighter2Delays.push({
        name: 'fighter2',
        delay: +(this.selected2ndFighter.delay * i).toFixed(2)
      });
    }

    // Joining fighter1 and fighter2 delays and sorting by delay
    const unitedSortedDelays = (fighter1Delays.concat(fighter2Delays)).sort((a, b) => a.delay - b.delay);

    for (let i = 0; i < unitedSortedDelays.length; i++) {
      // Simple "match engine"
      if (unitedSortedDelays[i].name === 'fighter1') {
        const damage = this.selected1stFighter.attack - this.selected2ndFighter.defence <= 0 ? Math.random() * (1 - 0) + 0 : (this.selected1stFighter.attack - this.selected2ndFighter.defence) * (Math.random() * (1.2 - 0.7) + 0.7);
        fighter2Health -= damage;
        this.matchReport += '🕛 ' + unitedSortedDelays[i].delay + ' s : '+ this.selected1stFighter.name + ' lyö ja tekee ' + damage.toFixed(2) + ' vahinkoa. ' + this.selected2ndFighter.name + ' jäi energiaa ' + (fighter2Health <= 0 ? 0 : fighter2Health.toFixed(2)) + '\n';
      } else if (unitedSortedDelays[i].name === 'fighter2') {
        const damage = this.selected2ndFighter.attack - this.selected1stFighter.defence <= 0 ? Math.random() * (1 - 0) + 0 : (this.selected2ndFighter.attack - this.selected1stFighter.defence) * (Math.random() * (1.2 - 0.7) + 0.7);
        fighter1Health -= damage;
        this.matchReport += '🕛 ' + unitedSortedDelays[i].delay + ' s : ' + this.selected2ndFighter.name + ' lyö ja tekee ' + damage.toFixed(2) + ' vahinkoa. ' + this.selected1stFighter.name + ' jäi energiaa ' + (fighter1Health <= 0 ? 0 : fighter1Health.toFixed(2)) + '\n';
      }

      if (fighter1Health <= 0 || fighter2Health <= 0) {
        // Stop writing match report once one of the fighters have health 0 or lower
        break;
      }
    }

    // Announcing winner
    if (fighter1Health < 0) {
      this.matchReport += '\n🏆 ' + this.selected2ndFighter.name + ' voitti taistelun!';
    } else if (fighter2Health < 0) {
      this.matchReport += '\n🏆 ' + this.selected1stFighter.name + ' voitti taistelun!';
    } else {
      // Announcing draw
      this.matchReport += '\n🤷 ' + 'Nämä taistelijat päätyivät tasapeliin!';
    }

    this.showMatchReport = true;
  }

  openRonisLinkedInProfile() {
    window.open('https://www.linkedin.com/in/roni-brandt-12543415b/', '_blank');
  }
}
