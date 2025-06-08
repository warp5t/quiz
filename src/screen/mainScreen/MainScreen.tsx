import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { RootState } from "../../store/store"
import { AppDispatch } from "../../store/store";
import { sendAnswer } from "../../slice/progressSlice/progressSlice";


export const MainScreen = () => {
  const stateConfigQuiz = useSelector((state:RootState) => state.configSliceStart.results);
  // const state = useSelector((state: RootState) => state.)
  const dispatch = useDispatch<AppDispatch>();
  // const ammountQuestion = stateConfigQuiz.length;
  let index = 0;
  const type = stateConfigQuiz[index].type;

  const decodeEntities = (text: string) => {
  const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };

  const handleAnswer = (answer: string) => {
    dispatch(sendAnswer({
      categoryName: stateConfigQuiz[index].category,
      type: stateConfigQuiz[index].type,
      question: stateConfigQuiz[index].question,
      difficulty: stateConfigQuiz[index].difficulty,
      answer_player: answer,
      correct_answer: stateConfigQuiz[index].correct_answer
    }));
  }

  if (type === 'multiple') {
    const arrQuest = [...stateConfigQuiz[index].incorrect_answers, stateConfigQuiz[index].correct_answer];
    const arrShuffled = [...arrQuest].sort(() => Math.random() - 0.5);

    return (
      <div>
        <h4>{decodeEntities(stateConfigQuiz[index].category)}</h4>
        <p>Difficulty: {stateConfigQuiz[index].difficulty}</p>
        <p>{decodeEntities(stateConfigQuiz[index].question)}</p>
         <div>
          {arrShuffled.map((answer) => (
            <button key={answer} onClick={() => handleAnswer(answer)}>
              {decodeEntities(answer)}
            </button>
          ))}
        </div>
        <button onClick={() => {console.log('stateConfigQuiz: ',stateConfigQuiz)}}>LOG</button>
      </div>
    )
  } else if (type === 'boolean') {
    return (
      <div>
        <h4>{decodeEntities(stateConfigQuiz[index].category)}</h4>
        <p>Difficulty: {stateConfigQuiz[index].difficulty}</p>
        <p>{decodeEntities(stateConfigQuiz[index].question)}</p>
        <div>
          <button onClick={() => {}}>True</button>
          <button onClick={() => {}}>False</button>
        </div>
        <button onClick={() => {console.log('stateConfigQuiz: ',stateConfigQuiz)}}>LOG</button>
      </div>
    )
  }
}
