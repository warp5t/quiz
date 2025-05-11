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
      <h2>Category</h2>
      <select name="" id="">
        {categoryQuest.map((el) => (
          <option key={el.id}>{el.name}</option>
        ))}
      </select>
      <button onClick={() => { console.log(categoryQuest) }}>Log Categories</button>
    </div>
  );
};