export type Group = {
  id: string;
  people: Person[];
  canHavePlusOne: boolean;
  plusOne: Guest;
};

export type Person = Guest | Child;

export type Guest = {
  id: string;
  going: boolean;
  firstName: string;
  lastName: string;
  foodChoice: FoodChoice;
  dietaryPreference: string;
};

export type Child = Guest & {
  age: number;
  needsHighChair: boolean;
};

export enum FoodChoice {
  CHICKEN,
  STEAK,
  VEGETARIAN,
  KIDS,
}
