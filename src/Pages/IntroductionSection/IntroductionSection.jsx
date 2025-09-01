



// import React, { useState, useEffect } from "react";
// import ReactPlayer from "react-player";
// import { Play, Pause, Volume2, VolumeX, ChevronDown } from "lucide-react";

// export default function IntroSection({ url = "https://www.youtube.com/watch?v=oXmHgiSieDc" }) {
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isMuted, setIsMuted] = useState(true);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const isDirectVideo = url.match(/\.(mp4|webm|ogg)$/i);

//   return (
//     <section className="relative min-h-screen w-full overflow-hidden bg-[#222222]/80 pt-24 pb-40">
//       {/* Video Background */}
//       <div className="absolute inset-0 w-full h-full">
//         {isDirectVideo ? (
//           <video
//             id="hero-video"
//             className="absolute inset-0 w-full h-full object-cover opacity-70"
//             autoPlay
//             muted={isMuted}
//             loop
//             playsInline
//           >
//             <source src={url} type="video/mp4" />
//             متصفحك لا يدعم الفيديو.
//           </video>
//         ) : (
//           <ReactPlayer
//             url={url}
//             playing={isPlaying}
//             muted={isMuted}
//             loop
//             width="100%"
//             height="100%"
//             className="absolute inset-0 w-full h-full object-cover opacity-70"
//           />
//         )}

//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
//       </div>

//       {/* Video Controls */}
//       <div className="absolute top-6 right-6 z-20 flex gap-3">
//         {/* <button
//           onClick={() => setIsPlaying(!isPlaying)}
//           className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
//         >
//           {isPlaying ? (
//             <Pause className="w-5 h-5 group-hover:scale-110 transition-transform" />
//           ) : (
//             <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
//           )}
//         </button> */}
//         <button
//           onClick={() => setIsMuted(!isMuted)}
//           className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
//         >
//           {isMuted ? (
//             <VolumeX className="w-5 h-5 group-hover:scale-110 transition-transform" />
//           ) : (
//             <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
//           )}
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 h-full flex items-center">
//         <div className="container mx-auto px-6 lg:px-12">
//           <div className="max-w-4xl">
//             {/* Title */}
//             <div
//               className={`transform transition-all duration-1000 delay-300 ${
//                 isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
//               }`}
//             >
//               <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
//                 <span className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-500 bg-clip-text text-transparent animate-pulse">
//                   Innovation
//                 </span>
//                 <br />
//                 <span className="text-white">Meets Design</span>
//               </h1>
//             </div>

//             {/* Description */}
//             <div
//               className={`transform transition-all duration-1000 delay-500 ${
//                 isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
//               }`}
//             >
//               <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
//                 Crafting extraordinary digital experiences that push the boundaries of creativity and technology. Where
//                 stunning visuals meet seamless functionality.
//               </p>
//             </div>

//             {/* CTA Buttons */}
//             <div
//               className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-700 ${
//                 isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
//               }`}
//             >
//               <button className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 hover:from-yellow-700 hover:to-yellow-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
//                 <span className="relative z-10">Explore Our Work</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </button>

//               <button className="group border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm hover:bg-white/10 transform hover:scale-105">
//                 <span className="group-hover:text-yellow-300 transition-colors duration-300">Learn More</span>
//               </button>
//             </div>

//             {/* Stats */}
//             <div
//               className={`flex flex-col sm:flex-row gap-8 mt-12 transform transition-all duration-1000 delay-900 ${
//                 isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
//               }`}
//             >
//               <div className="text-center sm:text-left">
//                 <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
//                 <div className="text-gray-400">Projects Completed</div>
//               </div>
//               <div className="text-center sm:text-left">
//                 <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
//                 <div className="text-gray-400">Happy Clients</div>
//               </div>
//               <div className="text-center sm:text-left">
//                 <div className="text-3xl md:text-4xl font-bold text-white mb-2">5+</div>
//                 <div className="text-gray-400">Years Experience</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
//         <div className="flex flex-col items-center text-white/70">
//           <span className="text-sm font-light mb-2 tracking-wider">SCROLL</span>
//           <ChevronDown className="w-6 h-6 animate-bounce" />
//         </div>
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-60"></div>
//       <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-amber-500 rounded-full animate-pulse opacity-40"></div>
//       <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-70 animation-delay-1000"></div>
//     </section>
//   );
// }


import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, ChevronDown } from "lucide-react";

export default function IntroSection({ url = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const isDirectVideo = url.match(/\.(mp4|webm|ogg)$/i);

  // For YouTube videos, we'll use an iframe embed
  const getYouTubeId = (url) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeId(url);
  
  const handlePlayPause = () => {
    if (youtubeId) {
      // For YouTube, we'll control the iframe
      const iframe = document.querySelector('#youtube-player');
      if (iframe) {
        if (isPlaying) {
          iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        } else {
          iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    if (youtubeId) {
      const iframe = document.querySelector('#youtube-player');
      if (iframe) {
        if (isMuted) {
          iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
        } else {
          iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
        }
      }
    }
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#222222] pt-24 pb-40">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {isDirectVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            onError={(e) => console.log('Video error:', e)}
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : youtubeId ? (
          <div className="absolute inset-0 w-full h-full">
            <iframe
              id="youtube-player"
              src={`https://www.youtube.com/watch?v=oXmHgiSieDc`}
              className="absolute inset-0 w-full h-full opacity-70 pointer-events-none"
              style={{ 
                width: '100vw', 
                height: '100vh',
                transform: 'scale(1.2)', 
                transformOrigin: 'center',
                objectFit: 'cover'
              }}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Background Video"
            />
          </div>
        ) : (
          // Fallback gradient background
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-900 opacity-70"></div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
      </div>

      {/* Video Controls */}
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        <button
          onClick={handlePlayPause}
          className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
        </button>
        <button
          onClick={handleMuteToggle}
          className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 group-hover:scale-110 transition-transform" />
          ) : (
            <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            {/* Title */}
            <div
              className={`transform transition-all duration-1000 delay-300 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                <span className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Innovation
                </span>
                <br />
                <span className="text-white">Meets Design</span>
              </h1>
            </div>

            {/* Description */}
            <div
              className={`transform transition-all duration-1000 delay-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Crafting extraordinary digital experiences that push the boundaries of creativity and technology. Where
                stunning visuals meet seamless functionality.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              <button className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10">Explore Our Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm hover:bg-white/10 transform hover:scale-105">
                <span className="group-hover:text-yellow-300 transition-colors duration-300">Learn More</span>
              </button>
            </div>

            {/* Stats */}
            <div
              className={`flex flex-col sm:flex-row gap-8 mt-12 transform transition-all duration-1000 delay-900 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              <div className="text-center sm:text-left">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">5+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm font-light mb-2 tracking-wider">SCROLL</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-amber-500 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-70"></div>
    </section>
  );
}