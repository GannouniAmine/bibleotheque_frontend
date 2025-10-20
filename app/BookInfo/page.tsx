'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Book } from "../ListBooks/Book.entity";
import Swal from "sweetalert2";
import StarRate from "./startrate";

export default function BookInfo() {
  const lireStatus = ['TO READ', 'READING', 'FINISHED' ,'ABANDONED']
  const [bookDetail, setBookDetail] = useState<Book | null>(null);
  const [modifier , setModifier] = useState(false);
  const params = useSearchParams();
  const id = params.get("id");

  function handleChangeBookInfo(event: any ) {
    const { name, value } = event.target;
    if (bookDetail) {
      setBookDetail({ ...bookDetail, [name]: value });
    }
  }

   useEffect(() => {
     getBookInfo();
  });

  async function getBookInfo() {
      const response = await fetch(`http://localhost:5000/books/getBookById/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
      const data = await response.json();
      setBookDetail(data);
  }
  async function handleClick() {
    setModifier(!modifier);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (bookDetail) {
      await fetch(`http://localhost:5000/books/updatebook/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(bookDetail),
      });
      Swal.fire({
        icon: "success",
        title: "Book updated successfully",
        showConfirmButton: false,
        timer: 1500,
      })
  }
}

  return (
  <div className="bg-white-100 dark:bg-white-800 py-10 min-h-screen">
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 overflow-hidden shadow">
            <img
              className="w-full h-full object-cover"
              src={bookDetail?.couverture_url}
              alt={bookDetail?.titre || "Book cover"}
            />
          </div>
        </div>


        <div className="md:w-2/3 relative">

          <div className="flex justify-end mb-4">
            <button
              onClick={handleClick}
              type="button"
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M16.5 3.5l4 4M12 11l6-6"/>
              </svg>
              {modifier ? "Cancel" : "Edit"}
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Book Information
          </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                title="titre"
                type="text"
                name="titre"
                value={bookDetail?.titre || ""}
                onChange={handleChangeBookInfo}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                disabled={!modifier}
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Author</label>
              <input
                title="auteur"
                type="text"
                name="auteur"
                value={bookDetail?.auteur || ""}
                onChange={handleChangeBookInfo}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                disabled={!modifier}
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">ISBN</label>
              <input
                title="isbn"
                type="text"
                name="isbn"
                value={bookDetail?.isbn || ""}
                onChange={handleChangeBookInfo}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                disabled={!modifier}
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Genre</label>
              <input
                title="genre"
                type="text"
                name="genre"
                value={bookDetail?.genre || ""}
                onChange={handleChangeBookInfo}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                disabled={!modifier}
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Publication Date</label>
              <input
                title="date_publication"
                type="text"
                name="date_publication"
                value={bookDetail?.date_publication?.toString().split("T")[0] || ""}
                onChange={handleChangeBookInfo}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                disabled={!modifier}
              />
            </div>

            <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Reading Status
                </label>
                <select
                  title="status"
                  name="status"
                  value={bookDetail?.status || ""}
                  onChange={handleChangeBookInfo}
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  disabled={!modifier}
                >
                  <option value="">Select a status</option>
                  {lireStatus.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>


            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
              <input
                title="date_debut_lecture"
                type="text"
                name="date_debut_lecture"
                value={bookDetail?.date_debut_lecture?.toString().split("T")[0] || ""}
                placeholder="Date format YYYY-MM-DD"
                onChange={handleChangeBookInfo}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                disabled={!modifier}
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">End Date</label>
              <input
                title="date_fin_lecture"
                type="text"
                name="date_fin_lecture"
                placeholder="Date format YYYY-MM-DD"
                value={bookDetail?.date_fin_lecture?.toString().split("T")[0] || ""}
                onChange={handleChangeBookInfo}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                disabled={!modifier}
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Rating</label>
              <StarRate 
              bookDetail={bookDetail}
              setBookDetail={setBookDetail}
              editable={modifier}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Personal Notes</label>
              <textarea
                title="notes_personnelles"
                name="notes_personnelles"
                value={bookDetail?.notes_personnelles || ""}
                onChange={handleChangeBookInfo}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                rows={4}
                disabled={!modifier}
              />
            </div>
          </div>
          {modifier && (
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
            </div>
          )}
        </form>
        </div>
      </div>
    </div>
  </div>
);
}

