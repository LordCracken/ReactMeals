import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Backdrop = ({ onClose }: { onClose: () => void }) => <div className={classes.backdrop} onClick={onClose} />;

const ModalOverlay = ({ children }: { children: React.ReactNode }) => (
  <div className={classes.modal}>
    <div className={classes.content}>{children}</div>
  </div>
);

const portalElement = document.getElementById('overlays')!;

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
