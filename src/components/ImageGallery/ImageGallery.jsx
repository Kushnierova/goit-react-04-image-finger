import { useState, useEffect } from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';

const APIKEY = '37129638-ec213efed10419ab76c2321de';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function ImageGallery({ searchText }) {
  const [images, setImages] = useState([]);
  const [perPage] = useState(12);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!searchText) {
      return;
    }
    setStatus(Status.PENDING);

    fetch(
      `https://pixabay.com/api/?q=${searchText}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_pare=${perPage}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(images => {
        if (!images.total) {
          return Promise.reject(
            new Error(`No picture was found for "${searchText}"`)
          );
        }
        setImages(images.hits);
        setPage(1);
        setStatus(Status.RESOLVED);
        setShowMoreButton(
          images.total > 12 && Math.ceil(images.total / 12) > page
        );
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [searchText, page, perPage]);
  // Line 56:6:  React Hook useEffect has missing dependencies: 
  // 'page' and 'perPage'. Either include them or remove the dependency 
  // array. You can also replace multiple useState variables with useReducer
  //  if 'setShowMoreButton' needs the current value of 'page' 
  //  react-hooks/exhaustive-deps
  const loadMore = async () => {
    setImages(state => [...state, ...images]);
  };

  if (status === Status.IDLE) {
    return (
      <p className={css.idleText}>
        Enter what exactly you are looking for in the search
      </p>
    );
  }
  if (status === Status.PENDING) {
    return <Loader />;
  }
  if (status === Status.REJECTED) {
    return <p className={css.idleText}>{error.message}</p>;
  }
  if (status === Status.RESOLVED) {
    return (
      <div>
        <ul className={css.gallery}>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
          {showMoreButton && <Button onClick={loadMore} title="Load more" />}
        </ul>
      </div>
    );
  }
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(),
  onClick: PropTypes.func,
};
export default ImageGallery;
