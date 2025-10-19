import { BookOpen, BookMarked, CheckCircle, XCircle, Star, Target, Heart } from "lucide-react"

export default function Reading(props: any) {
  const stats = [
    {
      title: "Books To Read",
      value: props.bookToread.length,
      color: "text-blue-500",
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Books Reading",
      value: props.bookReading.length,
      color: "text-yellow-500",
      icon: <BookMarked className="w-8 h-8 text-yellow-500" />,
    },
    {
      title: "Books Finished",
      value: props.bookFinished.length,
      color: "text-green-500",
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Books Abandoned",
      value: props.bookAbandoned.length,
      color: "text-red-500",
      icon: <XCircle className="w-8 h-8 text-red-500" />,
    },
    {
      title: `Books Read in ${new Date().getFullYear()}`,
      value: props.booksLusCetteAnnee.length,
      color: "text-pink-500",
      icon: <Heart className="w-8 h-8 text-pink-500" />,
    },
    {
      title: "Most Preferred Genre",
      value: props.generePrefere,
      color: "text-purple-500",
      icon: <Star className="w-8 h-8 text-purple-500" />,
    },
    {
      title: "My Annual Goal",
      value: `${props.annulgoal.length} / 24`,
      color: "text-amber-500",
      icon: <Target className="w-8 h-8 text-amber-500" />,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-gray-100">
        My Reading Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="mb-4">{stat.icon}</div>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
              {stat.title}
            </h2>
            <p className={`text-4xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
