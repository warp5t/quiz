import ReactDOM from 'react-dom'

interface ModalEndQuizProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalEndQuiz: React.FC<ModalEndQuizProps> = ({setIsModal}) => {
  const modalRoot = document.getElementById('modal-root') as HTMLDivElement;

  if(!modalRoot) {
    console.error('there is no modal-root')
    return null
  }

  return ReactDOM.createPortal(
    <div>
      <button onClick={() => {console.log('Cancel')}}>Cancel</button>
      <button onClick={() => {console.log('Confirm')}}>Confirm</button>
      <button onClick={() => {setIsModal((isModal) => !isModal)}}>close</button>
    </div>,
    modalRoot
  )
};
