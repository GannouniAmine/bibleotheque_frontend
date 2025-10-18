'use client'

import { useEffect, useState } from 'react'
import { Book } from '../ListBooks/Book.entity'
import Reading from './reading'
import BookList from './bookList'

export default function Dashboard() {
  const [data, setData] = useState<Book[]>([])

  useEffect(() => {
    getBooks()
  }, [])

  async function getBooks() {
      const response = await fetch('http://localhost:5000/books/getuserBooks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const booksData = await response.json()
      setData(booksData)}



  const bookToread = data.filter((book) => book.status === 'TO READ')
  const bookReading = data.filter((book) => book.status === 'READING')
  const bookFinished = data.filter((book) => book.status === 'FINISHED')
  const bookAbandoned = data.filter((book) => book.status === 'ABANDONED')
  const booksLusCetteAnnee = data.filter((book) => {
    const year = new Date(book.date_debut_lecture).getFullYear();
    return year === new Date().getFullYear();
  });
  const booksLusFinCetteAnnee = data.filter((book) => {
    const year = new Date(book.date_fin_lecture).getFullYear();
    return year === new Date().getFullYear();
  });

  const count: Record<string, number> = {};
  data.forEach((book) => {
  if (count[book.genre]) {
    count[book.genre] += 1; 
  } else {
    count[book.genre] = 1; 
  }
  });

var maxGenre = "";
var maxCount = 0;

for (const [genre, c] of Object.entries(count)) {
    if (c > maxCount) {
      maxCount = c;
      maxGenre = genre;
    }
  }

  const LastfiveBooks = bookFinished.slice(-5)

  return (
    <div className="min-h-screen bg-white-100 dark:bg-white-900 py-16 px-6">
      <Reading
        bookToread={bookToread}
        bookReading={bookReading}
        bookFinished={bookFinished}
        bookAbandoned={bookAbandoned}
        booksLusCetteAnnee={booksLusCetteAnnee}
        generePrefere={maxGenre}
        annulgoal ={booksLusFinCetteAnnee}
      />

      <BookList
       LastfiveBooks = {LastfiveBooks}
      />

    </div>
  )
}
