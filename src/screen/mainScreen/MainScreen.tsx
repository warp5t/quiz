import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { AppDispatch } from '../../store/store';
import { sendAnswer } from '../../slice/progressSlice/progressSlice';
import { useState, useEffect, useMemo } from 'react';

import { WinAnimation } from '../../components/animation/winAnimation/WinAnimation';
import { Confetti } from '../../components/animation/confetti/Confetti';

export const MainScreen = () => {
  const [isVisible, setIsVisibleC] = useState(false);
  const [index, setIndex] = useState(0);
  const stateConfigQuiz = useSelector((state: RootState) => state.configSliceStart.results);
  const stateProgress = useSelector((state: RootState) => state.configSliceProgress);
  const time = useSelector((state: RootState) => state.configSliceStart.time);
  const dispatch = useDispatch<AppDispatch>();
  const ammountQuestion = stateConfigQuiz.length;
  const type = stateConfigQuiz[index].type;
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(time / 60 - 1);

  const decodeEntities = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((seconds) => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(intervalId);
          return 0;
        }
        if (seconds <= 0) {
          setMinutes((prevMinutes) => {
            return Math.max(prevMinutes - 1, 0);
          });
          return 59;
        }
        return seconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [minutes]);

  const winChange = () => {
    setIsVisibleC((isVisible) => !isVisible);
  };

  const handleAnswer = (answer: string) => {
    dispatch(
      sendAnswer({
        categoryName: stateConfigQuiz[index].category,
        type: stateConfigQuiz[index].type,
        question: stateConfigQuiz[index].question,
        difficulty: stateConfigQuiz[index].difficulty,
        answer_player: answer,
        correct_answer: stateConfigQuiz[index].correct_answer,
      }),
    );
  };

  const answerChecking = (answer: string) => {
    const correctAnswer = stateConfigQuiz[index].correct_answer;
    if (correctAnswer === answer) {
      winChange();
    }
    if (index < ammountQuestion - 1 && index !== ammountQuestion - 1) {
      setIndex((index) => (index += 1));
    }
  };

  if (type === 'multiple') {
    const question = stateConfigQuiz[index].question;
    const memoQuestions = useMemo(() => {
      const arrQuest = [
        ...stateConfigQuiz[index].incorrect_answers,
        stateConfigQuiz[index].correct_answer,
      ];
      return [...arrQuest].sort(() => Math.random() - 0.5);
    }, [question]);

    return (
      <div>
        <p>
          Question {index + 1} out of {ammountQuestion}
        </p>
        <h4>{decodeEntities(stateConfigQuiz[index].category)}</h4>
        <p>Difficulty: {stateConfigQuiz[index].difficulty}</p>
        <p>
          {minutes} : {String(seconds).padStart(2, '0')}
        </p>
        <p>{decodeEntities(stateConfigQuiz[index].question)}</p>
        <div>
          {memoQuestions.map((answer) => (
            <button
              key={answer}
              onClick={() => {
                handleAnswer(answer);
                answerChecking(answer);
              }}
            >
              {decodeEntities(answer)}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            console.log('stateConfigQuiz: ', stateConfigQuiz);
            console.log('stateProgress: ', stateProgress);
            console.log('index: ', index);
            console.log('time: ', time);
          }}
        >
          End Quiz
        </button>
        <WinAnimation isVisible={isVisible} setIsVisible={winChange} />
        {isVisible && <Confetti />}
      </div>
    );
  } else if (type === 'boolean') {
    return (
      <div>
        <p>
          Question {index + 1} out of {ammountQuestion}
        </p>
        <h4>{decodeEntities(stateConfigQuiz[index].category)}</h4>
        <p>Difficulty: {stateConfigQuiz[index].difficulty}</p>
        <p>
          {minutes} : {String(seconds).padStart(2, '0')}
        </p>
        <p>{decodeEntities(stateConfigQuiz[index].question)}</p>
        <div>
          <button
            onClick={() => {
              handleAnswer('True');
              answerChecking('True');
            }}
          >
            True
          </button>
          <button
            onClick={() => {
              handleAnswer('False');
              answerChecking('False');
            }}
          >
            False
          </button>
        </div>
        <button
          onClick={() => {
            console.log('stateConfigQuiz: ', stateConfigQuiz);
            console.log('stateProgress: ', stateProgress);
          }}
        >
          End Quiz
        </button>
        <WinAnimation isVisible={isVisible} setIsVisible={winChange} />
        {isVisible && <Confetti />}
      </div>
    );
  }
};
