import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { RootState } from "../../store/store"
import { AppDispatch } from "../../store/store";
import { sendAnswer } from "../../slice/progressSlice/progressSlice";
import { useMemo } from "react";


export const MainScreen = () => {
  const stateConfigQuiz = useSelector((state:RootState) => state.configSliceStart.results);
  const stateProgress = useSelector((state: RootState) => state.configSliceProgress);
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

  const answerChecking = (answer: string) => {
    const correctAnswer = stateConfigQuiz[index].correct_answer;
    if (correctAnswer === answer) {
      console.log('right answer');
    } else {
      console.log('wrong answer');
    }
  };

  if (type === 'multiple') {
    const memoQuestArr = useMemo(() => {
      const arrQuest = [...stateConfigQuiz[index].incorrect_answers, stateConfigQuiz[index].correct_answer];
      return [...arrQuest].sort(() => Math.random() - 0.5);
    }, [index]);

    return (
      <div>
        <h4>{decodeEntities(stateConfigQuiz[index].category)}</h4>
        <p>Difficulty: {stateConfigQuiz[index].difficulty}</p>
        <p>{decodeEntities(stateConfigQuiz[index].question)}</p>
         <div>
          {memoQuestArr.map((answer) => (
            <button key={answer} onClick={() => {
              handleAnswer(answer)
              answerChecking(answer)
              }}>
              {decodeEntities(answer)}
            </button>
          ))}
        </div>
        <button onClick={() => {
          console.log('stateConfigQuiz: ',stateConfigQuiz)
          console.log('stateProgress: ', stateProgress)
          }}>LOG</button>
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
         <button onClick={() => {
          console.log('stateConfigQuiz: ',stateConfigQuiz)
          console.log('stateProgress: ', stateProgress)
          }}>LOG</button>
      </div>
    )
  }
}
