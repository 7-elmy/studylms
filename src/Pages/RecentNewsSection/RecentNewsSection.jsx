import React from 'react';
import { ChevronUp } from 'lucide-react';

export default function RecentNewsSection() {
  const newsArticles = [
    {
      id: 1,
      image: "https://via.placeholder.com/400x250/e2e8f0/64748b?text=News+Image",
      title: "Best Educational Psd Template Launching Today",
      excerpt: "Areas tackled in the most fundamental part of medical research include cellular and molecular biology...",
      date: "MAR 05, 2017",
      author: "ANDREW CASET"
    },
    {
      id: 2,
      image: "https://via.placeholder.com/400x250/e2e8f0/64748b?text=News+Image",
      title: "Your one stop Solution for Android Development Needs",
      excerpt: "Areas tackled in the most fundamental part of medical research include cellular and molecular biology...",
      date: "MAR 05, 2017",
      author: "ANDREW CASET"
    },
    {
      id: 3,
      image: "https://via.placeholder.com/400x250/e2e8f0/64748b?text=News+Image",
      title: "Online Learning students council meeting 2017",
      excerpt: "Areas tackled in the most fundamental part of medical research include cellular and molecular biology...",
      date: "MAR 05, 2017",
      author: "ANDREW CASET"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Main News Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Recent News
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Share your work to collaborate with our vibrant design element.
            </p>
            {/* Decorative underline */}
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4"></div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {newsArticles.map((article) => (
              <article 
                key={article.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt="News article"
                    className="w-full h-48 sm:h-56 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 leading-tight hover:text-custom-yellow transition-colors duration-200 cursor-pointer">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="text-xs sm:text-sm text-gray-500 font-medium">
                    <span>{article.date}</span>
                    <span className="mx-2">BY</span>
                    <span className="text-gray-700">{article.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button (Optional) */}
          <div className="text-center mt-12">
            <button className="bg-custom-yellow hover:bg-custom-yellow text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}