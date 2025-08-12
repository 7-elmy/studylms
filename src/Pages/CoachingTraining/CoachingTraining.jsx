import { useState, useEffect } from 'react';

export default function CoachingTrainingPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set a countdown timer (you can adjust this target date)
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 2); // 2 hours from now

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Content Section */}
        <div className="  p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Left Side - Image and Content */}
            <div className="flex-1">
              <div className="flex items-start gap-6">
                {/* Placeholder for image */}
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div> 
                
                {/* Content */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Get The Coaching Training
                  </h1>
                  <p className="text-xl text-gray-600 mb-4">
                    1000s of online courses for free
                  </p>
                  <p className="text-gray-500 mb-6">
                    German final week mother of god grey viverra no computer unlock impossibru. Pikachu grin venenatis cuteness...
                  </p>
                  
                  <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded hover:bg-gray-200 transition-colors">
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Timer and Call to Action */}
            <div className="lg:w-80 w-full">
              {/* Limited Seating Notice */}
              <p className="text-gray-600 text-sm mb-4 text-right">
                It's limited seating! Hurry up
              </p>
              
              {/* Countdown Timer */}
              <div className="flex gap-4 justify-end mb-6">
                <div className="bg-gray-800 text-white px-4 py-6 rounded-lg text-center min-w-16">
                  <div className="text-2xl font-bold">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-300 mt-1">Hours</div>
                </div>
                <div className="bg-gray-800 text-white px-4 py-6 rounded-lg text-center min-w-16">
                  <div className="text-2xl font-bold">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-300 mt-1">Minutes</div>
                </div>
                <div className="bg-gray-800 text-white px-4 py-6 rounded-lg text-center min-w-16">
                  <div className="text-2xl font-bold">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-300 mt-1">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-lg text-gray-700 font-medium">
              CREATE AN ACCOUNT TO GET STARTED
            </span>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors">
              SIGN UP NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}