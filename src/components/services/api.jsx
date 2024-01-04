import axios from 'axios';

const APIKEY = '37129638-ec213efed10419ab76c2321de'
const url = 'https://pixabay.com/api/'
const maxPhotos = 12

export async function PixabayApi(keyword, page) {
  try{
  const {data} = await axios.get('', {
     baseURL: url,
     params: {
       key: APIKEY,
       q: keyword,
       image_type: 'photo',
       orientation: 'horizontal',
       safesearch: true,
       per_page: maxPhotos,
       page: page,
     }
   });

    return data
     } catch (error) {
    console.error(error);
  }
}