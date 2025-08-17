import { useState } from "react";
import { Link } from "react-router-dom";

export default function DynamicBreadcrumb({BreadCrumbs=[] , MainTitle}) {
  // Example data - you can pass this as props
  //console.log(BreadCrumbs);
  
  const [breadcrumbs, setBreadcrumbs] = useState(BreadCrumbs);

  // Demo function to test different breadcrumb lengths
  const testBreadcrumbs = (count) => {
  
    setBreadcrumbs(BreadCrumbs[count - 1] || []);
  };

  return (
    <div className=" bg-gray-50">
      {/* Header Section */}
      <div className="bg-gray-400 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-5xl font-bold">{MainTitle}</h1>
        </div>
      </div>

      {/* Dynamic Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-gray-600" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center space-x-2">
                {/* Breadcrumb Item */}
                {crumb.href ? (
                  <Link 
                    to={crumb.href}
                    className="hover:text-custom-yellow cursor-pointer transition-colors duration-200"
                    onClick={(e) => e.preventDefault()} // Prevent navigation in demo
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium">{crumb.label}</span>
                )}
                
                {/* Separator - don't show after last item */}
                {index < breadcrumbs.length - 1 && (
                  <span className="text-gray-400 select-none">›</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

    
    </div>
  );
}

