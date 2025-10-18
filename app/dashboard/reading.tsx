export default function Reading(props : any) {
  return(
    <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
          My Reading 
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Books To Read
            </h2>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {props.bookToread.length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Books Reading
            </h2>
            <p className="text-4xl font-bold text-yellow-500 dark:text-yellow-400">
              {props.bookReading.length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Books Finished
            </h2>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400">
              {props.bookFinished.length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Books Abandoned
            </h2>
            <p className="text-4xl font-bold text-red-600 dark:text-red-400">
              {props.bookAbandoned.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Books Read in {new Date().getFullYear()}
            </h2>
            <p className="text-4xl font-bold text-pink-600 dark:text-pink-400">
            {props.booksLusCetteAnnee.length}
            </p>

          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              The most preferred genre
            </h2>
            <p className="text-4 font-bold text-pink-600 dark:text-pink-400">
             {props.generePrefere}
            </p>

          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              My annual Goal
            </h2>
            <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
             {props.annulgoal.length} / 24
            </p>
          </div>
        </div>
      </div>
  )
}