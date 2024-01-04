import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { PixabayApi } from 'components/services/api';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';

class ImageGallery extends Component {
  state = {
    pictures: [],
    perPage: 12,
    page: 1,
    error: null,
    showMoreButton: false,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchText } = this.props;

    if (prevProps.searchText !== searchText) {
      this.setState({ status: 'pending' });
      this.searchImages();
    }
  }

  searchImages = async () => {
    this.setState({ status: 'pending' });
    const { searchText } = this.props;
    const { perPage, page } = this.state;

    try {
      const response = await PixabayApi(searchText, perPage, page);
      const pictures = response.hits;
      const totalPictures = response.totalHits;
      const totalPages = Math.ceil(totalPictures / 12);

      this.setState({
        pictures: [...pictures],
        page: 1,
        status: 'resolved',
        error: null,
        showMoreButton: totalPictures > 12 && totalPages > page,
      });

      if (!pictures.length) {
        throw new Error(`No picture was found for "${searchText}"`);
      }
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  loadMore = async () => {
    const { searchText } = this.props;
    const response = await PixabayApi(searchText);
    const pictures = response.hits;
    this.setState(prevState => ({
      pictures: [...prevState.pictures, ...pictures],
    }));
  };

  render() {
    const { pictures, error, status, showMoreButton } = this.state;

    // const { searchText } = this.props;

    if (status === 'idle') {
      return (
        <p className={css.idleText}>
          Enter what exactly you are looking for in the search
        </p>
      );
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <p className={css.idleText}>{error.message}</p>;
    }
    if (status === 'resolved') {
      return (
        <div>
          <ul className={css.gallery}>
            {pictures.map(picture => (
              <ImageGalleryItem picture={picture} key={picture.id} />
            ))}
            {showMoreButton && (
              <Button onClick={this.loadMore} title="Load more" />
            )}
          </ul>
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(),
  onClick: PropTypes.func,
};
export default ImageGallery;
