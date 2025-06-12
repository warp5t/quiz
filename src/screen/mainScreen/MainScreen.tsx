import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { RootState } from "../../store/store"
import { AppDispatch } from "../../store/store";
import { sendAnswer } from "../../slice/progressSlice/progressSlice";
import { useState } from "react";

import { WinAnimation } from "../../components/animation/winAnimation/WinAnimation";
import { Confetti } from "../../components/animation/confetti/Confetti";

export default () => {
  const [isVisible, setIsVisibleC] = useState(false);
  const [index, setIndex] = useState(0);
  const stateConfigQuiz = useSelector((state: RootState) => state.configSliceStart.results);
  const stateProgress = useSelector((state: RootState) => state.configSliceProgress);
  const dispatch = useDispatch<AppDispatch>();
  const ammountQuestion = stateConfigQuiz.length;

  const type = stateConfigQuiz[index].type;

  const decodeEntities = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };

  const winChange = () => {
    setIsVisibleC((isVisible) => !isVisible)
  }

  const handleAnswer = (answer: string) => {
    dispatch(sendAnswer({
      categoryName: stateConfigQuiz[index].category,
      type: stateConfigQuiz[index].type,
      question: stateConfigQuiz[index].question,
      difficulty: stateConfigQuiz[index].difficulty,
      answer_player: answer,
      correct_answer: stateConfigQuiz[index].correct_answer
    }));
  };

  const answerChecking = (answer: string) => {
    const correctAnswer = stateConfigQuiz[index].correct_answer;
    if (correctAnswer === answer) {
      winChange()
    }
    if (index < ammountQuestion - 1 && index !== ammountQuestion - 1) {
      setIndex((index) => index += 1)
    }
  };

  if (type === 'multiple') {
    const arrQuest = [...stateConfigQuiz[index].incorrect_answers, stateConfigQuiz[index].correct_answer];
    const jumbleQuest = [...arrQuest].sort(() => Math.random() - 0.5);

    return (
      <div>
        <h4>{decodeEntities(stateConfigQuiz[index].category)}</h4>
        <p>Difficulty: {stateConfigQuiz[index].difficulty}</p>
        <p>{decodeEntities(stateConfigQuiz[index].question)}</p>
        <div>
          {jumbleQuest.map((answer) => (
            <button key={answer} onClick={() => {
              handleAnswer(answer);
              answerChecking(answer);
            } }>
              {decodeEntities(answer)}
            </button>
          ))}
        </div>
        <button onClick={() => {
          console.log('stateConfigQuiz: ', stateConfigQuiz);
          console.log('stateProgress: ', stateProgress);
          console.log('index: ', index);

        } }>LOG</button>
        <WinAnimation  isVisible={isVisible} setIsVisible={winChange}/>
        {isVisible && <Confetti />}
        </div>
    );
  } else if (type === 'boolean') {
    return (
      <div>
        <h4>{decodeEntities(stateConfigQuiz[index].category)}</h4>
        <p>Difficulty: {stateConfigQuiz[index].difficulty}</p>
        <p>{decodeEntities(stateConfigQuiz[index].question)}</p>
        <div>
          <button onClick={() => { } }>True</button>
          <button onClick={() => { } }>False</button>
        </div>
        <button onClick={() => {
          console.log('stateConfigQuiz: ', stateConfigQuiz);
          console.log('stateProgress: ', stateProgress);
        } }>LOG</button>
      </div>
    );
  }
};
