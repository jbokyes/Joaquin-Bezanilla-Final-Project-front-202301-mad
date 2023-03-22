/* eslint-disable jsx-a11y/no-redundant-roles */
import { SyntheticEvent, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useFood } from "../../hooks/use.food";
import { FoodStructure, ProtoFoodStructure } from "../../models/food";
import { FoodRepo } from "../../services/repositories/food.repo";

export function Form() {
  const { id } = useParams();
  console.log(id);
  const repo = useMemo(() => new FoodRepo(), []);
  const { foods } = useFood(repo);
  console.log(foods);
  let foodToEdit = foods.find((item) => item.id === id);
  const { editFood, addFood } = useFood(repo);

  const type = foodToEdit === undefined ? "add" : "";
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const inputs = form.querySelectorAll("input");
    const newFood: Partial<FoodStructure> = {
      name: inputs[0].value,
      cuisine: inputs[1].value,
      diet: inputs[2].value,
      region: inputs[3].value,
      info: inputs[4].value,
      img: inputs[5].value,
    };
    const image = (form.elements[5] as HTMLFormElement).files?.item(0);
    console.log(form.elements[5].files.item(0));
    if (type === "add") {
      addFood(newFood as ProtoFoodStructure, image);
    } else {
      newFood.id = foodToEdit!.id;
      editFood(newFood, image);
    }
    form.reset();
  };

  return (
    <form action="" onSubmit={handleSubmit} id="form" data-testid="form">
      <div className="form-line">
        <label htmlFor="">Name: </label>
        <input
          type="text"
          placeholder="Rick"
          defaultValue={foodToEdit?.name}
          required
        />
      </div>
      <div className="form-line">
        <label htmlFor="">Cuisine: </label>
        <input
          type="text"
          placeholder="Rick"
          defaultValue={foodToEdit?.cuisine}
          required
        />
      </div>
      <div className="form-line">
        <label htmlFor="">Region: </label>
        <input
          type="text"
          placeholder="Rick"
          defaultValue={foodToEdit?.region}
          required
        />
      </div>
      <div className="form-line">
        <label htmlFor="">Diet: </label>
        <input
          type="text"
          placeholder="Rick"
          defaultValue={foodToEdit?.diet}
          required
        />
      </div>
      <div className="form-line">
        <label htmlFor="">Description: </label>
        <input
          type="text"
          placeholder="Rick"
          defaultValue={foodToEdit?.info}
          required
        />
      </div>
      <div className="form-line">
        <label htmlFor="">Image: </label>
        <input type="file" defaultValue={foodToEdit?.img} />
      </div>
      <div className="button-div">
        <button type="submit">SUBMIT</button>
      </div>
    </form>
  );
}
