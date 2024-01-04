import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { children } = this.props;
//     return createPortal(
//       <div className={css.overlay} onClick={this.handleBackdropClick}>
//         <div className={css.modal}>{children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }

Modal.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Modal;
