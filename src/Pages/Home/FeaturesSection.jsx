
export default function FutureSection() {
  return (
    <div>
      <div className="flex justify-center items-center bg-yellow-500 py-8 rounded-md px-4">
        <div className="w-full">
          <div className="grid grid-cols-12 gap-8">
            <FeatureCard  title="First Preparatory " to="#" />
            <FeatureCard  title="Second Preparatory " to="#" />
            <FeatureCard  title="Third Preparatory  " to="#" />
            <FeatureCard  title="First Secondary " to="#" />
            <FeatureCard  title="Second Secondary  " to="#" />
            <FeatureCard  title="Third Secondary  " to="#" />
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
    <div className=" col-span-12 md:col-span-2  ">
      <a
        href={to}
        className="group flex items-center gap-4 text-white hover:text-yellow-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg p-2"
        onFocus={handleFocus}
      >
      
        
        <div className="flex items-center gap-2">
          <div className='w-2 h-2 bg-white rounded-full'></div>
          <h2 className="text-sm  ">{title}</h2>
        
         
        </div>
      </a>
    </div>
  )
}