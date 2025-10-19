'use client'
import React, { useState } from "react"
import Swal from "sweetalert2"
export default function ModalAddBooks({ closeModal , upadateList } : any ) {
  const [book, setBook] = useState({
    title: '',
    author: '',
    ISBN: '',
    publicationDate: '',
    genre: '',
    coverUrl: ''
  })
  const genres = ['Novel','Adventure','Science Fiction','Fantasy','Mystery','Historical','Romance','Horror','Biography','Essay','Poetry','Drama','Fairy Tale','Comic Book','Self-Help','Non-Fiction']
  async function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setBook({ ...book, [name]: value })
    console.log(book)
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()

      const response = await fetch ("http://localhost:5000/books/createBook" ,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json" ,
                'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(book)
        }
      )
      if(!response.ok){
        throw new Error('Error adding book')
      }
      upadateList
      
      closeModal()
      Swal.fire({
        title: 'Book Added',
        text: 'Book added successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })
  }

  return (
        <>
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer z-10"
      ></div>

      <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-full max-w-lg bg-white dark:bg-gray-800 shadow-2xl rounded-2xl
                      p-8 border border-gray-200 dark:border-gray-700 transition-all">
        
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600
                     text-white rounded-full flex justify-center items-center text-sm font-bold shadow-md transition"
          onClick={closeModal}
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          Add a New Book
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            placeholder="Enter title..."
            className="w-full p-2.5 border border-gray-300 dark:border-gray-600 
                      rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                      transition"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Enter author..."
            className="w-full p-2.5 border border-gray-300 dark:border-gray-600 
                      rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                      transition"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            ISBN
          </label>
          <input
            type="text"
            name="ISBN"
            value={book.ISBN}
            onChange={handleChange}
            placeholder="Enter ISBN..."
            className="w-full p-2.5 border border-gray-300 dark:border-gray-600 
                      rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                      transition"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Cover URL
          </label>
          <input
            type="text"
            name="coverUrl"
            value={book.coverUrl}
            onChange={handleChange}
            placeholder="Enter cover URL..."
            className="w-full p-2.5 border border-gray-300 dark:border-gray-600 
                      rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                      transition"
            required
          />
        </div>

          <div>
            <label htmlFor="genre" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Genre
            </label>
            <select
              id="genre"
              name="genre"
              value={book.genre}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 
                         rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                         transition"
              required
            >
              <option value="">-- Select a Genre --</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Publication Date
            </label>
            <input
              type="date"
              name="publicationDate"
              placeholder="publication date ..."
              value={book.publicationDate}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 
                         rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                         transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium
                       rounded-lg transition-colors shadow-md"
          >
            Add Book
          </button>
        </form>
      </div>
    </>
  )
}
