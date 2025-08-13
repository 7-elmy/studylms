import React from 'react'
import DynamicBreadcrumb from '../../Components/Ui/DynamicBreadcrumb';
import { href } from 'react-router-dom';

export default function Subscriptions() {
    const events = [
    {
      date: '01',
      month: 'MARCH',
      day: 'WEDNESDAY',
      title: 'WordPress Theme Development with Bootstrap',
      time: '8:00 am - 5:00 pm',
      location: 'Great Russell Street, WC1B 3DG UK',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop'
    },
    {
      date: '05',
      month: 'MARCH',
      day: 'SATURDAY',
      title: 'Build Apps with React Native',
      time: '12:00 pm - 5:00 pm',
      location: 'No1 Warehouse London, UK',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop'
    },
    {
      date: '14',
      month: 'MAy',
      day: 'THURSDAY',
      title: 'Free Yoga & Exercise Class at Every Morning',
      time: '4:00 pm - 8:00 pm',
      location: '21 New Globe Walk London, UK',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop'
    },
    {
      date: '15',
      month: 'MARCH',
      day: 'THURSDAY',
      title: 'Free Yoga & Exercise Class at Every Morning',
      time: '4:00 pm - 8:00 pm',
      location: '21 New Globe Walk London, UK',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop'
    },
    {
      date: '13',
      month: 'MARCH',
      day: 'THURSDAY',
      title: 'Free Yoga & Exercise Class at Every Morning',
      time: '4:00 pm - 8:00 pm',
      location: '21 New Globe Walk London, UK',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop'
    }
  ];

  return (
    <div>
         {/* <div className="bg-gray-400 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-5xl font-bold">Courses</h1>
        </div>
      </div>

      
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="hover:text-blue-600 cursor-pointer">Home</span>
            <span>›</span>
            <span className="text-gray-900">Events</span>
          </div>
        </div>
      </div> */}

      <DynamicBreadcrumb MainTitle={"Subscriptions"} BreadCrumbs={[{label:"Home" ,href:"/home"} ,{label:"subscriptions"}]}/>

    <div className="max-w-7xl mx-auto p-6">
      <div className="space-y-8">
        {events.map((event, index) => (
          <div key={index} className="flex flex-col lg:flex-row gap-6 items-start border border-gray-200 rounded-lg p-6  hover:shadow-md transition-shadow duration-300">
            {/* Date Section */}
            <div className="flex-shrink-0 text-center lg:text-left">
              <div className="inline-block lg:block">
                <div className="text-6xl  font-bold text-yellow-400 leading-none">
                  {event.date}
                  <span className='text-gray-300 text-sm'>

                  {event.month}
                  </span>
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide mt-1">
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">
                  {event.day}
                </div>
              </div>
            </div>

            {/* Event Content */}
            <div className="flex-grow">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Event Details */}
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-custom-yellow  leading-tight">
                    {event.title}
                  </h3>
                  
                  <div className="text-gray-600 mb-4 space-y-1">
                    <p>{event.time} | {event.location}</p>
                  </div>
                  
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-sm font-medium hover:bg-custom-yellow hover:text-white transition-colors duration-200 uppercase tracking-wide text-sm">
                    REGISTER
                  </button>
                </div>

                {/* Event Image */}
                <div className="flex-shrink-0">
                  <img
                    src={event.image}
                    alt="image description"
                    className="w-full lg:w-64 h-48 lg:h-32 object-cover rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
