import { useState } from 'react';
import Modal from 'components/Modal';
// import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({picture}) {
  const [showModal, setShowModal] = useState(false);

 const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
          <li className={css.item} key={picture.id}>
            <img
              src={picture.webformatURL}
              alt={picture.tags}
              className={css.img}
              onClick={toggleModal}
            />

            {showModal && (
              <Modal onClose={toggleModal}>
                <img
                  src={picture.largeImageURL}
                  alt={picture.tags}
                  className={css.largeImageGalleryItem}
                />
              </Modal>
            )}
          </li>
  );
}
// export class ImageGalleryItem extends Component {
//   state = { showModal: false };

//   toggleModal = () => {
//     this.setState(prevState => ({
//       showModal: !prevState.showModal,
//     }));
//   };

//   render() {
//     const { showModal } = this.state;
//     const { pictures } = this.props;
//     return (
//       <div>
//         <ul className={css.gallery}>
//           {pictures.map(picture => (
//             <li className={css.item} key={picture.id}>
//               <img
//                 src={picture.webformatURL}
//                 alt={picture.tags}
//                 className={css.img}
//                 onClick={this.toggleModal}
//               />

// {showModal && (
//               <Modal onClose={this.toggleModal}>
//                 <img
//                   src={picture.largeImageURL}
//                   alt={picture.tags}
//                   className={css.largeImageGalleryItem}
//                 />
//               </Modal>
//             )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// ImageGalleryItem.propTypes = {
//   picture: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     webformatURL: PropTypes.string.isRequired,
//     tags: PropTypes.string.isRequired,
//     largeImageURL: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default ImageGalleryItem;
