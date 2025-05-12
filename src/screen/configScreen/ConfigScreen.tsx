import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store/store"
import { useEffect, useRef } from "react"
import { getCategoryThunk } from "../../slice/configSlice"
import { AppDispatch } from "../../store/store"
import { Category } from "../../slice/configSliceType"
// import { ConfigState } from "../../slice/configSliceType"

export const ConfigScreen = () => {
  const categoryQuest: Category[] = useSelector((state: RootState) => state.configSlice.trivia_categories);
  const dispatch = useDispatch<AppDispatch>();

  const amountRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const difficultyRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const timeRef = useRef<HTMLSelectElement>(null);

  const handleStartQuiz = () => {
    const selectedParams = {
      amount: amountRef.current?.value,
      category: categoryRef.current?.value,
      difficulty: difficultyRef.current?.value,
      type: typeRef.current?.value,
      // time: timeRef.current?.value,
    };

    const params = new URLSearchParams();
    Object.entries(selectedParams).forEach(([key, value]) => {
      if (value && value !== "any") {
        params.append(key, value);
      }
    });

    console.log(params.toString());
    console.log('categoryQuest: ', categoryQuest)
  };

  useEffect(() => {
    dispatch(getCategoryThunk());
  }, []);

  return (
    <div>
      <h3>Number of questions</h3>
      <select ref={amountRef} defaultValue="3">
      {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <h3>Category</h3>
      <select ref={categoryRef} defaultValue="General Knowledge">
        {categoryQuest.map((el) => (
          <option key={el.id} value={el.id}>{el.name}</option>
        ))}
      </select>
      <h3>Difficulty</h3>
      <select ref={difficultyRef} defaultValue="any">
        <option value="any">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <h3>Type</h3>
      <select ref={typeRef} defaultValue="any">
        <option value="any">Any Type</option>
        <option value="multiple">Multiple Choise</option>
        <option value="boolean">True/False</option>
      </select>
      <h3>Time</h3>
        <select ref={timeRef} defaultValue="5">
          <option value="1">1 Minute</option>
          <option value="2">2 Minutes</option>
          <option value="5">5 Minutes</option>
        </select>
        <button onClick={handleStartQuiz}>Start Quiz</button>
        <button>See my stats</button>
      <button onClick={() => { console.log(categoryQuest) }}>Log Categories</button>
    </div>
  );
};