import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store/store"
import { useEffect, useState } from "react"
import { getCategoryThunk } from "../../slice/configSlice"
import { AppDispatch } from "../../store/store"
import { Category } from "../../slice/configSliceType"
// import { ConfigState } from "../../slice/configSliceType"

export const ConfigScreen = () => {
  const categoryQuest: Category[] = useSelector((state: RootState) => state.configSlice.trivia_categories);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedParams, setSelectedParams] = useState({
    amount: "10",
    category: "",
    difficulty: "any",
    type: "any",
    time: "1",
  });

  useEffect(() => {
    dispatch(getCategoryThunk());
  }, []);

  return (
    <div>
      <h3>Number of questions</h3>
      <select name="" id="">
      {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <h3>Category</h3>
      <select name="category" id="">
        {categoryQuest.map((el) => (
          <option key={el.id} value={el.name}>{el.name}</option>
        ))}
      </select>
      <h3>Difficulty</h3>
      <select name="difficulty" id="">
        <option value="any">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <h3>Type</h3>
      <select name="type" id="">
        <option value="any">Any Type</option>
        <option value="multiple">Multiple Choise</option>
        <option value="boolean">True/False</option>
      </select>
      <h3>Time</h3>
        <select name="time" id="">
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