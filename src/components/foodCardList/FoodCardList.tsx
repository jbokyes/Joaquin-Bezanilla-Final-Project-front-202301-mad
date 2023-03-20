import { useMemo } from "react";
import { useFood } from "../../hooks/use.food";
import { FoodStructure } from "../../models/food";
import { FoodRepo } from "../../services/repositories/food.repo";
import { FoodCard } from "../foodCard/FoodCard";

export function FoodCardList() {
  const repo = useMemo(() => new FoodRepo(), []);
  const { foods } = useFood(repo);
  return (
    <div>
      {foods.map((item: FoodStructure) => (
        <FoodCard food={item} key={item.id}></FoodCard>
      ))}
    </div>
  );
}
