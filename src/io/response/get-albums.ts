import { marketAlbumsType } from '../types';

export function prepareAlbums(payload: Array<Object>): marketAlbumsType {
  let productByAlbum = payload['productByAlbum'];
  // photo

  let albums = payload['albums'].map((album) => {
    return {
      id: album['id'],
      ownerId: album['owner_id'],
      title: album['title'],
      photo: album['photo'] || ''
    };
  });
  let products = payload['products'].map((prod) => {
    let albumId = '';
    productByAlbum.map((item) => {
      if (item['products'].indexOf(prod.id) !== -1) {
        albumId = item['albumId'];
      }
    });
    return {
      id: prod['id'],
      ownerId: prod['owner_id'],
      albumId: albumId,
      title: prod['title'],
      description: prod['description'],
      price: prod['price']['text'],
      priceNum: prod['price']['amount'] / 100,
      category: prod['category'],
      date: new Date(prod['date']),
      preview_photo: prod['photos'] ? prod['photos'][0]['photo_604'] : '',
      photo: prod['photos'] ? prod['photos'][0]['photo_807'] : ''
    };
  });
  return {
    albums: albums,
    products: products
  };
}
