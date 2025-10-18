export default function BookList(props :any) {
    return(
        <>
        <div id="category-body"  aria-labelledby="category-heading">
         <h1 className="text-3xl font-bold text-center mt-20 mb-10 text-gray-800 dark:text-white">
          Last 5 Finished Books
        </h1>
        <div className="overflow-x-auto rounded-2xl shadow-lg mt-8">
          <table className="min-w-full border-collapse bg-white dark:bg-gray-800">
            <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Genre</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">reading end date</th>
              </tr>
            </thead>
            <tbody>
              {props.LastfiveBooks.map((book , index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{book.titre}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{book.auteur}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{book.genre}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                    {book.date_fin_lecture.toString().split('T')[0] }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
    )
}