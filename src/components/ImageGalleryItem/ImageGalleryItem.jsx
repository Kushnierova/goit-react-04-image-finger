import { useState } from 'react';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({image}) {
  const [showModal, setShowModal] = useState(false);

 const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
          <li className={css.item} key={image.id}>
            <img
              src={image.webformatURL}
              alt={image.tags}
              className={css.img}
              onClick={toggleModal}
            />

            {showModal && (
              <Modal onClose={toggleModal}>
                <img
                  src={image.largeImageURL}
                  alt={image.tags}
                  className={css.largeImageGalleryItem}
                />
              </Modal>
            )}
          </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
