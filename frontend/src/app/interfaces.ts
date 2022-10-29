export interface FoodFighter {
    name: string,
    category: string,
    health: number,
    attack: number,
    defence: number,
    delay: number
}

export interface FoodNutrition {
    name: { fi: string },
    ingredientClass: { abbreviation: { fi: string } },
    energyKcal: number,
    carbohydrate: number,
    protein: number,
    fat: number
}