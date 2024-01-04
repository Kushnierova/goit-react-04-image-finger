import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick, title }) => {
  return (
    <button type="button" onClick={onClick} className={css.btn}>
      {title}
    </button>
  );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

export default Button;
