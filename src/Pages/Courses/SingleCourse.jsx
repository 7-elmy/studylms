import { Star, Users, Clock, Play, BookOpen, Award } from "lucide-react";
import { use, useEffect, useState } from "react";
import SubscriptionModal from "../../Components/Ui/SubscriptionModal";
import AssignmentSubmission from "../../Components/Ui/Assignment";
import CourseSlider from "../Home/CourseSlider";
import axios from "axios";
import QuizSubmission from "../../Components/Ui/Quiz";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { apiRequest } from "../../Redux/Apis/apiRequest";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function CourseDetailPage() {
  let {id}=useParams();
  console.log({id});
  
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [activeTab, setActiveTab] = useState("description");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  let dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  let { courseDetails } = useSelector((state) => state.api);
console.log({courseDetails});
let getDetails = async() => {

let response =   await dispatch(apiRequest({
      entity: "courseDetails",
      url: `api/courses/${id}`,
     headers:{
      "Authorization": `${sessionStorage.getItem("token")}`,
      "accept-language": `${localStorage.getItem("language")}`
     }

    }) );
   if(response.payload.error ){
    toast.error(response.payload.error);
      console.log("Course details fetched successfully", response.payload.data);
    }
    

    // Fetch courses or any initial data if needed

  }
  useEffect(()=>{
    getDetails();
    // Fetch courses or any initial data if needed
  }, []);
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

   const videos = [
    {
      id: "xfgWXWyWWKc",
      title: "Advanced Analytics & Data Visualization",
      description: "Learn cutting-edge techniques for transforming raw data into actionable business insights using modern visualization tools.",
      duration: "24:15",
      category: "Analytics"
    },
    {
      id: "dQw4w9WgXcQ", 
      title: "Enterprise Security Architecture",
      description: "Comprehensive guide to implementing robust security frameworks in large-scale enterprise environments.",
      duration: "18:42",
      category: "Security"
    }
  ];

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
             <p className="text-gray-600 leading-relaxed mb-6">
             {courseDetails?.data?.data?.description || "No description available for this course."}
            </p>
            {/* <p className="text-gray-600 leading-relaxed mb-4">
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
            </p> */}
          </div>
        );
      case "videos":
        return (
          <div className="prose  prose-gray max-w-none">
             <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        {/* <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Video Library</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our curated collection of expert-led training videos designed to elevate your professional skills and drive business success.
        </p> */}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

    {courseDetails?.data?.data?.lessons?.length > 0 &&
    courseDetails?.data?.data?.lessons.videos.map((video) => (
      <div
        key={video.id}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        {/* Video Container */}
        <div className="relative w-full h-0 pb-[56.25%] bg-gray-100">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={""}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
              {video.category}
            </span>
            <span className="text-sm text-gray-500 font-medium">
              {video.duration}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
            {video.title}
          </h3>
        </div>
      </div>
    ))}

        {/* {videos.map((video, index) => (
          <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
           
            <div className="relative w-full h-0 pb-[56.25%] bg-gray-100">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${video.id}?modestbranding=1&showinfo=0&rel=0&controls=1&disablekb=1&fs=1&iv_load_policy=3&cc_load_policy=0&loop=0&autoplay=0&mute=0`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
           
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {video.category}
                </span>
                <span className="text-sm text-gray-500 font-medium">
                  {video.duration}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                {video.title}
              </h3>
              
            
            </div>
          </div>
        ))} */}
      </div>

     
    </div>
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
     {courseDetails.error !=null ? <div className="bg-amber-100 flex justify-center items-center min-h-[100vh]">
                        


      <p className="p-8 text-center flex flex-col justify-center items-center shadow-2xl bg-white text-red-500 rounded-lg">
  
                        <svg className="w-16 h-16 text-red-500 mb-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
        {courseDetails.error}
      </p>
     </div>  :<>
     
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
            <span className="text-gray-900">{courseDetails?.data?.data?.name }</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {courseDetails?.data?.data?.name }
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-3">
                    <img src={courseDetails?.data?.data?.teacher_image} alt={courseDetails?.data?.data?.name} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Instructor</p>
                    <p className="font-medium text-gray-900">{courseDetails?.data?.data?.teacher}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-400 rounded mr-3 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium text-gray-900">{courseDetails?.data?.data?.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(5)}
                  </div>
                  <span className="text-sm text-gray-500">{`(${courseDetails?.data?.data?.average_rating})` }</span>
                </div>
              </div>
              
              <div className="w-full h-[600px] bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-8">
                {/* <iframe
                className="w-full h-full rounded-lg"
        
        src="https://www.youtube.com/embed/xfgWXWyWWKc"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe> */}

      <img src={courseDetails?.data?.data?.image} alt={courseDetails?.data?.data?.average_rating+12} />
       

     
              </div>
            </div>

            {/* <div className="flex justify-end items-center">
              <div className="md:w-1/4">
                <SubscriptionModal/>
              </div>
            </div> */}

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
                  onClick={() => setActiveTab("videos")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "videos"
                      ? "border-yellow-400 text-yellow-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                 Videos
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
     </>}
    </div>
  );
}





