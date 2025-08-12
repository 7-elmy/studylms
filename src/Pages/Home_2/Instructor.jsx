import { Award, User } from "lucide-react";

export default function InstructorsPage() {
  const instructors = [
    {
      id: 1,
      name: "Steaven Maseri",
      title: "Designer",
      description: "Fundamental parts of medical research include cellular and molecular biology.",
      image: "/api/placeholder/150/150"
    },
    {
      id: 2,
      name: "Jackson James",
      title: "Designer", 
      description: "Fundamental parts of medical research include cellular and molecular biology.",
      image: "/api/placeholder/150/150"
    },
    {
      id: 3,
      name: "Thorsten Tailor",
      title: "Artist",
      description: "Fundamental parts of medical research include cellular and molecular biology.",
      image: "/api/placeholder/150/150"
    },
    {
      id: 4,
      name: "Katrine Fonsmark",
      title: "Literature",
      description: "Fundamental parts of medical research include cellular and molecular biology.",
      image: "/api/placeholder/150/150"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-start space-x-4">
            <div className="bg-white/20 rounded-full p-2 mt-1">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold mb-2">
                New Student Join Every Week
              </h1>
              <p className="text-white text-lg opacity-90">
                New courses, interesting posts, popular books and much more!
              </p>
            </div>
          </div>
          <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Apply Course Now
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Instructors</h2>
          <div className="flex items-center space-x-3">
            <p className="text-gray-600 text-lg">
              We have more than 3,250 skilled & professional Instructors
            </p>
          </div>
          <div className="w-16 h-1 bg-yellow-400 mt-4"></div>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              {/* Instructor Image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <User className="w-20 h-20 text-gray-400" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              
              {/* Instructor Info */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {instructor.name}
                </h3>
                <div className="inline-block bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {instructor.title}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {instructor.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}