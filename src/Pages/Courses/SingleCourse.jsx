import { Star, Users, Clock, Play, BookOpen, Award } from "lucide-react";
import { useState } from "react";
import SubscriptionModal from "../../Components/Ui/SubscriptionModal";
import AssignmentSubmission from "../../Components/Ui/Assignment";
import CourseSlider from "../Home/CourseSlider";
import axios from "axios";
import QuizSubmission from "../../Components/Ui/Quiz";

export default function CourseDetailPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [activeTab, setActiveTab] = useState("description");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      comment: "This course was amazing! I learned so much about Swift programming.",
      date: "2 days ago",
      avatar: ""
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 5,
      comment: "Perfect for beginners. The pace was just right and the examples were very practical.",
      date: "1 week ago",
      avatar: ""
    }
  ]);

  const handleRatingSubmit = async () => {
    if (userRating === 0) {
      alert("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/courses/ratings", {
        courseId: "swift-beginners",
        rating: userRating,
        comment: reviewText
      });

      setReviews([
        {
          id: Date.now(),
          user: "You",
          rating: userRating,
          comment: reviewText,
          date: "Just now",
          avatar: ""
        },
        ...reviews
      ]);

      setUserRating(0);
      setReviewText("");
      alert("Thank you for your review!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoverRating || userRating || rating);
      stars.push(
        <button
          key={i}
          type={interactive ? "button" : "div"}
          className={`w-6 h-6 ${interactive ? "cursor-pointer" : ""}`}
          onClick={interactive ? () => setUserRating(i) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(i) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
        >
          <Star 
            className={`w-full h-full ${isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
          />
        </button>
      );
    }
    return stars;
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative 
              approaches to corporate strategy foster collaborative thinking to further the overall value 
              proposition. Organically grow the holistic world view of disruptive innovation via workplace 
              diversity and empowerment.
            </p>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              Encyclopaedia galactica Orion's sword explorations vanquish the impossible, astonishment 
              radio telescope with pretty stories for which there's little good evidence light years muse 
              about, great turbulent clouds billions upon billions the sky calls to us realm of the galaxies 
              laws of physics globular star cluster. Quasar the only home we've ever known extraordi claims 
              require extraordinary evidence billions upon billions Drake Equation.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Capitalize on low hanging fruit to identify a ballpark value added activity beta test Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution generated content in real-time will have multiple touchpoints for offshoring. Capitalize on low hanging fruit to identify a ballpark value added activity beta test Override the digital divide with additional astronomers. Trillion and billions upon billions upon billions upon billions upon billions. upon billions upon billions!
            </p>
          </div>
        );
      case "files":
        return (
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Course Materials</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Introduction PDF</span>
                  <button className="text-blue-600 hover:underline">Download</button>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Exercise Files</span>
                  <button className="text-blue-600 hover:underline">Download</button>
                </li>
                <li className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Bonus Resources</span>
                  <button className="text-blue-600 hover:underline">Download</button>
                </li>
              </ul>
            </div>
          </div>
        );
      case "ratings":
        return (
          <div className="space-y-8">
            
  <div className="bg-white p-6  ">
              <h3 className="text-lg font-semibold mb-4">Rate this course</h3>

              <div className=" ">
              <div className="flex flex-col  mb-4">
                <div className="flex mr-2">
                  {renderStars(0, true)}
                </div>
                <span className="text-sm text-gray-500">
                  {userRating > 0 ? `You rated: ${userRating} star${userRating > 1 ? 's' : ''}` : "Select rating"}
                </span>
              </div>

              {/* <textarea
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                rows={4}
                placeholder="Share your experience with this course..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              /> */}
              
              <button
                onClick={handleRatingSubmit}
                disabled={isSubmitting}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
              </div>
              
            </div>
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {renderStars(5)}
                  <span className="ml-2 text-gray-600">
                    {calculateAverageRating()} ({reviews.length} reviews)
                  </span>
                </div>
              </div>
              
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-white font-medium">
                      {review.user.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium">{review.user}</h4>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2 pl-13">{review.comment}</p>
                </div>
              ))}

            
            </div>
          </div>
        );
      case "assignments":
        return (
          <div className="space-y-4">
            <AssignmentSubmission/>
          </div>
        );
      case "Quiz":
        return (
          <div className="space-y-4">
            <QuizSubmission/>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-400 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-5xl font-bold">Single Courses</h1>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="hover:text-custom-yellow cursor-pointer">Home</span>
            <span>›</span>
            <span className="hover:text-custom-yellow cursor-pointer">Course</span>
            <span>›</span>
            <span className="text-gray-900">Swift Programming for Beginners</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Swift Programming For Beginners
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm text-gray-500">Instructor</p>
                    <p className="font-medium text-gray-900">LOSPHER COOKE</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-400 rounded mr-3 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium text-gray-900">PROGRAMMING LANGUAGE</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(5)}
                  </div>
                  <span className="text-sm text-gray-500">(2 Reviews)</span>
                </div>
              </div>
              
              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-8"></div>
            </div>

            <div className="flex justify-end items-center">
              <div className="md:w-1/4">
                <SubscriptionModal/>
              </div>
            </div>

            <div className="mb-8 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "description"
                      ? "border-yellow-400 text-yellow-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("files")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "files"
                      ? "border-yellow-400 text-yellow-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Files
                </button>
                <button
                  onClick={() => setActiveTab("ratings")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "ratings"
                      ? "border-yellow-400 text-yellow-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Ratings
                </button>
                <button
                  onClick={() => setActiveTab("assignments")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "assignments"
                      ? "border-yellow-400 text-yellow-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Assignments
                </button>
                <button
                  onClick={() => setActiveTab("Quiz")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "Quiz"
                      ? "border-yellow-400 text-yellow-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Quiz
                </button>
              </nav>
            </div>

            <div className="mb-12">
              {renderTabContent()}
            </div>

            {activeTab === "description" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What You Will Learn</h2>
                <p className="text-gray-600 leading-relaxed">
                  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative 
                  approaches to corporate strategy foster
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CourseSlider/>
    </div>
  );
}