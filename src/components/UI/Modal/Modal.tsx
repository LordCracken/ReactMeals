import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
}

const Backdrop = () => <div className={classes.backdrop} />;

const ModalOverlay = ({ children }: { children: React.ReactNode }) => (
  <div className={classes.modal}>
    <div className={classes.content}>{children}</div>
  </div>
);

const portalElement = document.getElementById('overlays')!;

const Modal = ({ children }: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
