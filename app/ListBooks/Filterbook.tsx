import { useState } from "react";

export default function Filterbook(props : any) {
    const genres = ['Novel','Adventure','Science Fiction','Fantasy','Mystery','Historical','Romance','Horror','Biography','Essay','Poetry','Drama','Fairy Tale','Comic Book','Self-Help','Non-Fiction']
    const lireStatus = ['TO READ', 'READING', 'FINISHED' ,'ABANDONED']

    const handleGenreChange = (genre: string) => {
        if (props.selectedGenres.includes(genre)) {
        props.setSelectedGenres(props.selectedGenres.filter((g : string)  => g !== genre));
        } else {
        props.setSelectedGenres([...props.selectedGenres, genre]);
        }
    };

  const handleStatusChange = (status: string) => {
    if (props.selectedStatus.includes(status)) {
      props.setSelectedStatus(props.selectedStatus.filter((s : string) => s !== status));
    } else {
      props.setSelectedStatus([...props.selectedStatus, status]);
    }
  };
  return (
    <>
    <div className="w-full p-3 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
      <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Genres</h6>
      <ul className="space-y-2 text-sm">
        {genres.map((genre, index) => (
            <li key={index} className="flex items-center">
            <input
                id={genre}
                type="checkbox"
                onChange={() => handleGenreChange(genre)}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-400"
            />
            <label htmlFor={genre} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                {genre}
            </label>
            </li>
        ))}
        </ul>
    </div>
    <div className="w-full p-3 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
      <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Status</h6>
      <ul className="space-y-2 text-sm">
    { lireStatus.map((status , index) => (
        <li key={index} className="flex items-center">
          <input
            id={status}
            type="checkbox"
            onChange={() => handleStatusChange(status)}
            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-400"
          />
          <label htmlFor={status} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            {status}
          </label>
        </li>))}
      </ul>
    </div>
    </>
  );
}
