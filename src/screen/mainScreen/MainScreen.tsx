import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { RootState } from "../../store/store"
import { AppDispatch } from "../../store/store";
import { sendAnswer } from "../../slice/progressSlice/progressSlice";
import { useMemo, useState } from "react";
// import { motion } from 'framer-motion';


import { WinAnimation } from "../../components/animation/winAnimation/WinAnimation";
import { Confetti } from "../../components/animation/confetti/Confetti";

export default () => {
  const [isVisible, setIsVisibleC] = useState(false);
  const stateConfigQuiz = useSelector((state: RootState) => state.configSliceStart.results);
  const stateProgress = useSelector((state: RootState) => state.configSliceProgress);
  const dispatch = useDispatch<AppDispatch>();
  // const [showConfetti, setShowConfetti] = useState(false);

  // const ammountQuestion = stateConfigQuiz.length;

  let index = 0;
  const type = stateConfigQuiz[index].type;

  const decodeEntities = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };

  const winChange = () => {
    setIsVisibleC((isVisible) => !isVisible)
    // setShowConfetti(true)
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
