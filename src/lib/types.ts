export type Group = {
  id: string;
  userName: string;
  people: Person[];
  canHavePlusOne: boolean;
  plusOne?: Guest;
  highChairs?: number;
};

export type Person = Guest | Child;

export type Guest = {
  going: boolean;
  firstName: string;
  lastName: string;
  foodChoice: FoodChoice | string;
  dietaryPreference?: string;
};

export type Child = Guest & {
  age: number;
  needsHighChair: boolean;
};

export enum FoodChoice {
  CHICKEN = "Chicken",
  SHORTRIB = "Shortrib",
  VEGETARIAN = "Vegetarian",
  KIDS_MEAL = "Kids Meal",
}
