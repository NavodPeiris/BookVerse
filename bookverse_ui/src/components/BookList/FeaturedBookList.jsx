import React from 'react';
import { useGlobalContext } from '../../context.';
import Book from "./Book";
import BookWithLikeCount from './BookWithLikeCount';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";
import { minio_link } from '../../backend_links';

// to show recommended and most liked books
const FeaturedBookList = () => {
  const {mostLikedBooks, recommendedBooks, loading} = useGlobalContext();
  const mostLikedBooksWithCovers = mostLikedBooks.map((singleBook) => {
    return {
      ...singleBook,
      // removing /works/ to get only id
      id: (singleBook.id),
      cover_img: singleBook.cover_image_available ? `${minio_link}/book-cover-images/${(singleBook.id)}.jpg` : coverImg
    }
  });

  const recommendedBooksWithCover = recommendedBooks.map((singleBook) => {
    return {
      ...singleBook,
      // removing /works/ to get only id
      id: (singleBook.id),
      cover_img: singleBook.cover_image_available ? `${minio_link}/book-cover-images/${(singleBook.id)}.jpg` : coverImg
    }
  });

  if(loading) return <Loading />;

  return (
    <section className='booklist'>
      <div className='container'>
        <div className='section-title'>
          <h2>Most Liked Books</h2>
        </div>
        <div className='booklist-content grid'>
          {
            mostLikedBooksWithCovers.slice(0, 30).map((item, index) => {
              return (
                <BookWithLikeCount key = {index} {...item} />
              )
            })
          }
        </div>
      </div>

      <div className='container'>
        <div className='section-title'>
          <h2>Recommended Books</h2>
        </div>
        <div className='booklist-content grid'>
          {
            recommendedBooksWithCover.slice(0, 30).map((item, index) => {
              return (
                <Book key = {index} {...item} />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default FeaturedBookList
