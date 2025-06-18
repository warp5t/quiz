export const ResultsScreen = () => {
  return (
    <div>
      <h4>Thank you for completing this quiz. Here are your results</h4>
      <div>
        You answered {} out of {} questions correctly”
      </div>
      <div>
        <p>Type: {}</p>
        <p>Category: {} </p>
        <p>Time: {}</p>
        <p>Difficulty: {}</p>
      </div>
      <div>Text indicating how much time user took to answer all the questions</div>
      <div>
        <button>Restart</button>
        <button>Choose another quiz</button>
      </div>
    </div>
  );
};
