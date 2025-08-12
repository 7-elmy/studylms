// import React from 'react';
// import { Calendar, Clock, MapPin } from 'lucide-react';

// const UpcomingEvents = () => {
//   const events = [
//     {
//       id: 1,
//       day: "01",
//       month: "MARCH",
//       dayOfWeek: "WEDNESDAY",
//       title: "WordPress Theme Development with Bootstrap",
//       time: "8:00 am - 5:00 pm",
//       location: "Great Russell Street, WC1B 3DG UK",
//       image: "/api/placeholder/120/80"
//     },
//     {
//       id: 2,
//       day: "05",
//       month: "MARCH",
//       dayOfWeek: "SATURDAY",
//       title: "Build Apps with React Native",
//       time: "12:00 pm - 5:00 pm",
//       location: "No1 Warehouse London, UK",
//       image: "/api/placeholder/120/80"
//     },
//     {
//       id: 3,
//       day: "12",
//       month: "MARCH",
//       dayOfWeek: "SUNDAY",
//       title: "Advanced JavaScript and ES6 Features",
//       time: "10:00 am - 4:00 pm",
//       location: "Tech Hub Manchester, UK",
//       image: "/api/placeholder/120/80"
//     }
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-12">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h2 className="text-4xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
//           <p className="text-gray-500 text-lg">Recent and upcoming educational events listed here</p>
//           <div className="w-12 h-1 bg-orange-400 mt-3"></div>
//         </div>
//         <button className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-md font-medium">
//           VIEW MORE
//         </button>
//       </div>

//       {/* Events List */}
//       <div className="space-y-8">
//         {events.map((event, index) => (
//           <div key={event.id} className="flex items-center bg-white p-6 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow duration-300">
//             {/* Date Section */}
//             <div className="flex-shrink-0 mr-8">
//               <div className="text-center">
//                 <div className="text-6xl font-bold text-orange-400 leading-none">
//                   {event.day}
//                 </div>
//                 <div className="text-sm font-medium text-gray-500 mt-1">
//                   {event.month}
//                 </div>
//                 <div className="text-sm font-medium text-gray-400 mt-1">
//                   {event.dayOfWeek}
//                 </div>
//               </div>
//             </div>

//             {/* Event Details */}
//             <div className="flex-grow">
//               <h3 className="text-2xl font-semibold text-gray-900 mb-3 hover:text-orange-500 transition-colors cursor-pointer">
//                 {event.title}
//               </h3>
              
//               <div className="flex items-center space-x-6 text-gray-600 mb-4">
//                 <div className="flex items-center">
//                   <Clock className="w-4 h-4 mr-2" />
//                   <span>{event.time}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <MapPin className="w-4 h-4 mr-2" />
//                   <span>{event.location}</span>
//                 </div>
//               </div>

//               <button className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-orange-400 hover:text-orange-600 transition-all duration-200 rounded-md font-medium">
//                 REGISTER
//               </button>
//             </div>

//             {/* Event Image */}
//             <div className="flex-shrink-0 ml-8">
//               <div className="w-32 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
//                 <span className="text-gray-500 text-xs">Event Image</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Additional Events Preview */}
//       <div className="mt-12 text-center">
//         <div className="inline-flex items-center space-x-2 text-gray-500">
//           <Calendar className="w-5 h-5" />
//           <span>More events coming soon...</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpcomingEvents;


import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      day: "01",
      month: "MARCH",
      dayOfWeek: "WEDNESDAY",
      title: "WordPress Theme Development with Bootstrap",
      time: "8:00 am - 5:00 pm",
      location: "Great Russell Street, WC1B 3DG UK",
      image: "/api/placeholder/120/80"
    },
    {
      id: 2,
      day: "05",
      month: "MARCH",
      dayOfWeek: "SATURDAY",
      title: "Build Apps with React Native",
      time: "12:00 pm - 5:00 pm",
      location: "No1 Warehouse London, UK",
      image: "/api/placeholder/120/80"
    },
    {
      id: 3,
      day: "12",
      month: "MARCH",
      dayOfWeek: "SUNDAY",
      title: "Advanced JavaScript and ES6 Features",
      time: "10:00 am - 4:00 pm",
      location: "Tech Hub Manchester, UK",
      image: "/api/placeholder/120/80"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Upcoming Events
          </h2>
          <p className="text-gray-500 text-base sm:text-lg">
            Recent and upcoming educational events listed here
          </p>
          <div className="w-12 h-1 bg-orange-400 mt-3"></div>
        </div>
        <button className="px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-md font-medium self-start sm:self-auto">
          VIEW MORE
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex flex-col lg:flex-row lg:items-center bg-white p-4 sm:p-6 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Date Section */}
            <div className="flex-shrink-0 flex items-center justify-center lg:justify-start mb-4 lg:mb-0 lg:mr-8">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold text-orange-400 leading-none">
                  {event.day}
                </div>
                <div className="text-sm font-medium text-gray-500 mt-1">
                  {event.month}
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-400 mt-1">
                  {event.dayOfWeek}
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="flex-grow order-last lg:order-none">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 hover:text-orange-500 transition-colors cursor-pointer">
                {event.title}
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-gray-600 mb-4 space-y-2 sm:space-y-0">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm sm:text-base">{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm sm:text-base">{event.location}</span>
                </div>
              </div>

              <button className="px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-orange-400 hover:text-orange-600 transition-all duration-200 rounded-md font-medium">
                REGISTER
              </button>
            </div>

            {/* Event Image */}
            <div className="flex-shrink-0 lg:ml-8 mb-4 lg:mb-0">
              <div className="w-full sm:w-32 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">Event Image</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Events Preview */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center space-x-2 text-gray-500">
          <Calendar className="w-5 h-5" />
          <span>More events coming soon...</span>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
