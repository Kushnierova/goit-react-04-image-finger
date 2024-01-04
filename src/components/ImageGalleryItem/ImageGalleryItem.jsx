import React, { Component } from 'react';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { picture } = this.props;
    return (
          <li className={css.item} key={picture.id}>
            <img
              src={picture.webformatURL}
              alt={picture.tags}
              className={css.img}
              onClick={this.toggleModal}
            />

            {showModal && (
              <Modal onClose={this.toggleModal}>
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
}

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
