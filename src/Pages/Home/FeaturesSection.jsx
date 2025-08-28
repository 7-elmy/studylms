import { BookOpen } from "lucide-react";

export default function FutureSection() {
  return (
    <div>
      <div className="flex justify-center items-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600  rounded-md ">
        <div className="w-full">
          <div className="grid grid-cols-12 md:grid-cols-8  ">
            <FeatureCard  title="First Preparatory " to="#" />
            <FeatureCard  title="Second Preparatory " to="#" />
            <FeatureCard  title="Third Preparatory  " to="#" />
            <FeatureCard  title="First Secondary " to="#" />
            
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ to = '#', Icon, title }) {
  const handleFocus = (e) => {
    const icon = e.currentTarget.querySelector('.icon-rotate');
    if (icon) {
      icon.style.transform = 'rotateY(360deg)';
      setTimeout(() => {
        icon.style.transform = 'rotateY(0deg)';
      }, 700);
    }
  };

  return (
    <div className=" col-span-12 md:col-span-2  shadow-lg py-8 px-4">
      <a
        href={to}
        className="group flex items-center gap-4 text-white hover:text-yellow-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg p-2"
        onFocus={handleFocus}
      >
      
        
        <div className="flex items-center gap-2">
          <div className='w-10  h-10 bg-amber-50 text-amber-700 flex justify-center items-center rounded-full'>
            <BookOpen className="animate" />
          </div>
          <h2 className="text-sm  ">{title}</h2>
        
         
        </div>
      </a>
    </div>
  )
}