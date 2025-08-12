import { useState } from "react";

export default function CurriculumAccordion({items , sectionTitle}) {

    console.log({ items });
    
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

 

  const getBadgeStyle = (badge) => {
    const styles = {
      VIDEO: "bg-cyan-400 text-white",
      PREVIEW: "bg-cyan-500 text-white", 
      FREE: "bg-green-500 text-white",
      QUIZ: "bg-blue-500 text-white",
      SEMINAR: "bg-orange-500 text-white"
    };
    return styles[badge] || "bg-gray-500 text-white";
  };

  return (
    <div className="max-w-4xl mx-auto  overflow-hidden">
      {/* Header */}
      <div className="">
        
        <p className=" text-lg font-semibold tracking-wide uppercase">
          {/* SECTION-1: INTRODUCTION */}
          {sectionTitle}
          
        </p>
      </div>

      {/* Course Items */}
      <div className="divide-y divide-gray-200 border border-gray-200 p-1 mt-3">
        {items?.map((item, index) => (
          <div key={index} className="bg-white">
            {/* Course Item Header */}
            <div 
              className="flex items-center justify-between p-6 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => toggleItem(index)}
            >
              <div className="flex items-center space-x-4">
               
                
                 {/* Expand Icon */}
                <div className={`transform transition-transform ${expandedItem === index ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
              </div>

              <div className="flex items-center space-x-3">
                {/* Badges */}
                <div className="flex space-x-2">
                  {item.badges.map((badge, badgeIndex) => (
                    <span
                      key={badgeIndex}
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getBadgeStyle(badge)}`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Duration */}
                <span className="text-gray-500 text-sm font-medium min-w-[60px] text-right">
                  {item.duration}
                </span>

              
              </div>
            </div>

            {/* Accordion Content */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedItem === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="px-6 pb-6 bg-gray-50 border-t border-gray-100">
                <div className="pl-14">
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


