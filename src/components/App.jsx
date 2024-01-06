import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

function App() {
  const [searchText, setSearchText] = useState(null);

  return (
    <div>
      <div>
        <Searchbar onSubmit={setSearchText} />
      </div>
      <div>
        <ImageGallery searchText={searchText} />
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
