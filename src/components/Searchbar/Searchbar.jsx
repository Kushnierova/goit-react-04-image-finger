import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';

function Searchbar({onSubmit}) {
  const [searchText, setSearchText] = useState('');

  const handleNameChange = e => {
    setSearchText(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchText.trim() === '') {
      toast.error('string is empty');
      return;
    }
    onSubmit(searchText);
    setSearchText('');
  };
  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <label htmlFor="">
          <button type="submit" className={css.btn}>
            <ImSearch className={css.btnLabel} />
          </button>
        </label>

        <input
          type="text"
          name="searchText"
          value={searchText}
          onChange={handleNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.input}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// class Searchbar extends Component {
//   state = {
//     searchText: '',
//   };
//   handleNameChange = e => {
//     this.setState({ searchText: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     if (this.state.searchText.trim() === '') {
//       toast.error('string is empty');
//       return;
//     }
//     this.props.onSubmit(this.state.searchText);
//     this.setState({ searchText: '' });
//   };
//   render() {
//     return (
//       <header className={css.searchbar}>
//         <form onSubmit={this.handleSubmit} className={css.searchForm}>
//           <label htmlFor="">
//             <button type="submit" className={css.btn}>
//               <ImSearch className={css.btnLabel} />
//             </button>
//           </label>

//           <input
//             type="text"
//             name="searchText"
//             value={this.searchText}
//             onChange={this.handleNameChange}
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             className={css.input}
//           />
//         </form>
//       </header>
//     );
//   }
// }

export default Searchbar;
