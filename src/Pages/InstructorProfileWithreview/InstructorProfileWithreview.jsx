// import React from 'react';
// import { Star } from 'lucide-react';

// const InstructorProfile = () => {
//   const StarRating = ({ rating = 5 }) => {
//     return (
//       <div className="flex space-x-1">
//         {[...Array(5)].map((_, i) => (
//           <Star
//             key={i}
//             className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white">
//       {/* About Instructor Section */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">About Instructor</h2>
        
//         <div className="border border-gray-200 rounded-lg p-6">
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* Profile Image */}
//             <div className="flex-shrink-0">
//               <img
//                 src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
//                 alt="Merry Jhonson"
//                 className="w-20 h-20 rounded-full object-cover"
//               />
//             </div>
            
//             {/* Profile Info */}
//             <div className="flex-grow">
//               <h3 className="text-xl font-semibold text-gray-800 mb-1">Merry Jhonson</h3>
//               <p className="text-gray-600 mb-4">Back-End Developer</p>
              
//               <p className="text-gray-700 leading-relaxed mb-6">
//                 Encyclopaedia galactica Orion's sword explorations vanquish the impossible, astonishment radio 
//                 telescope with pretty stories for which there's little good.
//               </p>
              
//               <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium transition-colors duration-200">
//                 VIEW PROFILE
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Reviews Section */}
//       <div>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reviews</h2>
        
//         <div className="mb-6">
//           <h3 className="text-lg font-medium text-gray-800">There Are 2 Reviews On This Course</h3>
//         </div>

//         {/* Review 1 */}
//         <div className="border-b border-gray-200 pb-6 mb-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-shrink-0">
//               <img
//                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
//                 alt="Lavin Duster"
//                 className="w-12 h-12 rounded-full object-cover"
//               />
//             </div>
            
//             <div className="flex-grow">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
//                 <div>
//                   <h4 className="font-semibold text-gray-800">Lavin Duster</h4>
//                   <p className="text-sm text-gray-500">March 7, 2016</p>
//                 </div>
//                 <StarRating rating={5} />
//               </div>
              
//               <p className="text-gray-700 leading-relaxed">
//                 Brunch fap cardigan, gentrify put a bird on it distillery mumblecore you probably haven't heard of them 
//                 asymmetrical bushwick. Put a bird on it schlitz fashion.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Review 2 */}
//         <div className="pb-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-shrink-0">
//               <img
//                 src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face"
//                 alt="Tim Cook"
//                 className="w-12 h-12 rounded-full object-cover"
//               />
//             </div>
            
//             <div className="flex-grow">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
//                 <div>
//                   <h4 className="font-semibold text-gray-800">Tim Cook</h4>
//                   <p className="text-sm text-gray-500">March 5, 2016</p>
//                 </div>
//                 <StarRating rating={5} />
//               </div>
              
//               <p className="text-gray-700 leading-relaxed">
//                 This course exceeded my expectations. The instructor's teaching style is clear and engaging, 
//                 making complex concepts easy to understand and implement.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstructorProfile;


import React from 'react';
import { Star } from 'lucide-react';

const InstructorProfile = () => {
  const StarRating = ({ rating = 5 }) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* About Instructor Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">About Instructor</h2>
        
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                alt="Merry Jhonson"
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            
            {/* Profile Info */}
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Merry Jhonson</h3>
              <p className="text-gray-600 mb-4">Back-End Developer</p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Encyclopaedia galactica Orion's sword explorations vanquish the impossible, astonishment radio 
                telescope with pretty stories for which there's little good.
              </p>
              
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium transition-colors duration-200">
                VIEW PROFILE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reviews</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800">There Are 2 Reviews On This Course</h3>
        </div>

        {/* Review 1 */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                alt="Lavin Duster"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">Lavin Duster</h4>
                  <p className="text-sm text-gray-500">March 7, 2016</p>
                </div>
                <StarRating rating={5} />
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                Brunch fap cardigan, gentrify put a bird on it distillery mumblecore you probably haven't heard of them 
                asymmetrical bushwick. Put a bird on it schlitz fashion.
              </p>
            </div>
          </div>
        </div>

        {/* Review 2 */}
        <div className="pb-6 mb-8 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face"
                alt="Tim Cook"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">Tim Cook</h4>
                  <p className="text-sm text-gray-500">March 5, 2016</p>
                </div>
                <StarRating rating={5} />
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                Fixie sartorial cray flexitarian pop-up health goth single-origin coffee sriracha
              </p>
            </div>
          </div>
        </div>

        {/* Add a Review Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add a Review</h2>
          
          <div className="mb-4">
            <p className="text-gray-600">
              Your email address will not be published. Required fields are marked <span className="text-yellow-500">*</span>
            </p>
          </div>

          <form className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Rating</label>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors"
                  />
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label htmlFor="review" className="block text-gray-700 font-medium mb-2">
                Your Review <span className="text-yellow-500">*</span>
              </label>
              <textarea
                id="review"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Write your review here..."
              />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name <span className="text-yellow-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email <span className="text-yellow-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Your email"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-8 py-3 rounded-md transition-colors duration-200 uppercase tracking-wide"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;