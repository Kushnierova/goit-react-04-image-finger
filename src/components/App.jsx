import React, { Component } from 'react';
// import { fetchPhotosByKeyword } from "../services/api";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    searchText: null,
  };

  handleFormSubmit = searchText => {
    this.setState({ searchText });
  };
  render() {
    const { searchText } = this.state;
    return (
      <div>
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
        </div>
        <div>
          <ImageGallery searchText={searchText} />
        </div>
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
