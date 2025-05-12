import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store/store"
import { useEffect } from "react"
import { getCategoryThunk } from "../../slice/configSlice"
import { AppDispatch } from "../../store/store"
import { Category } from "../../slice/configSliceType"
// import { ConfigState } from "../../slice/configSliceType"

export const ConfigScreen = () => {
  const categoryQuest: Category[] = useSelector((state: RootState) => state.configSlice.trivia_categories);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCategoryThunk());
  }, []);

  return (
    <div>
      <h3>Number of questions</h3>
      <select name="" id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
      </select>
      <h3>Category</h3>
      <select name="" id="">
        {categoryQuest.map((el) => (
          <option key={el.id} value={el.name}>{el.name}</option>
        ))}
      </select>
      <h3>Difficulty</h3>
      <select name="" id="">
        <option value="any">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <h3>Type</h3>
      <select name="" id="">
        <option value="any">Any Type</option>
        <option value="multiple">Multiple Choise</option>
        <option value="boolean">True/False</option>
      </select>
      <h3>Time</h3>
        <select name="" id="">
          <option value="1">1 Minute</option>
          <option value="2">2 Minutes</option>
          <option value="5">5 Minutes</option>
        </select>
        <button>Start Quiz</button>
        <button>See my stats</button>
      <button onClick={() => { console.log(categoryQuest) }}>Log Categories</button>
    </div>
  );
};