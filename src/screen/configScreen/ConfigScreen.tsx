import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useRef } from 'react';
import { getCategoryThunk } from '../../slice/initialSlice/configSliceInit';
import { AppDispatch } from '../../store/store';
import { Category } from '../../slice/initialSlice/configSliceInitType';
import { QuizApiParamsRequest } from '../../slice/startSlice/configStartSliceType';
import { getStartQuest } from '../../slice/startSlice/configSliceStart';
import { useNavigate } from 'react-router-dom';
import { setTime } from '../../slice/startSlice/configSliceStart';

export const ConfigScreen = () => {
  const categoryQuest: Category[] = useSelector(
    (state: RootState) => state.configSliceInitial.trivia_categories,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const amountRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const difficultyRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const timeRef = useRef<HTMLSelectElement>(null);

  const handleStartQuiz = () => {
    const selectedParams = {
      amount: amountRef.current?.value ? Number(amountRef.current.value) : undefined,
      category:
        categoryRef.current?.value !== 'any' ? Number(categoryRef.current?.value) : undefined,
      difficulty: difficultyRef.current?.value !== 'any' ? difficultyRef.current?.value : undefined,
      type: typeRef.current?.value !== 'any' ? typeRef.current?.value : undefined,
    };

    const filteredParams = Object.fromEntries(
      Object.entries(selectedParams).filter(([_, value]) => value !== undefined),
    ) as QuizApiParamsRequest;

    dispatch(getStartQuest(filteredParams));
    if (timeRef.current) {
      const selectedTime = Number(timeRef.current.value) * 60;
      dispatch(setTime(selectedTime));
    }
  };

  const toMainNavigate = () => {
    navigate('/game');
  };

  useEffect(() => {
    dispatch(getCategoryThunk());
  }, []);

  return (
    <div>
      <h3>Number of questions</h3>
      <select ref={amountRef} defaultValue='3'>
        {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      <h3>Category</h3>
      <select ref={categoryRef} defaultValue='any'>
        <option value='any'>Any Category</option>
        {categoryQuest.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>

      <h3>Difficulty</h3>
      <select ref={difficultyRef} defaultValue='any'>
        <option value='any'>Any Difficulty</option>
        <option value='easy'>Easy</option>
        <option value='medium'>Medium</option>
        <option value='hard'>Hard</option>
      </select>

      <h3>Type</h3>
      <select ref={typeRef} defaultValue='any'>
        <option value='any'>Any Type</option>
        <option value='multiple'>Multiple Choice</option>
        <option value='boolean'>True/False</option>
      </select>

      <h3>Time</h3>
      <select ref={timeRef} defaultValue={5}>
        <option value={1}>1 Minute</option>
        <option value={2}>2 Minutes</option>
        <option value={5}>5 Minutes</option>
      </select>

      <button
        onClick={() => {
          handleStartQuiz();
          toMainNavigate();
        }}
      >
        Start Quiz
      </button>
      <button>See my stats</button>
      <button
        onClick={() => {
          console.log(categoryQuest);
        }}
      >
        Log Categories
      </button>
    </div>
  );
};
