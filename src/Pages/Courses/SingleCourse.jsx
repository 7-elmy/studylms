import { Star, Users, Clock, Play, BookOpen, Award, User } from "lucide-react";
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
    useEffect(() => {
         window.scrollTo(0, 0);
      },[]);
  
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

  // const handleRatingSubmit = async () => {
  //   if (userRating === 0) {
  //     toast("Please select a rating");
  //     return;
  //   }

  //   console.log({course_id: id,
  //        rating: userRating});
  //       setIsSubmitting(true);
  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/ratings`, {
  //       course_id: id,
  //       rating: userRating
  //     });
  //     console.log({response});
  //     setUserRating(0);
     
  //     toast("Thank you for your review!");
  //   } catch (error) {
  //     console.error("Error submitting review:", error);
  //     // alert("Failed to submit review. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };



  // const handleCommentSubmit = async () => {
  //   if (reviewText === "") {
  //     toast("Please write comment");
  //     return;
  //   }

  //   const formdata = new FormData()
  //   formdata.append("comment", reviewText);
  //   formdata.append("course_id", id);
  //   console.log({course_id: id,
  //        comment: reviewText});
    

  //   setIsSubmitting(true);
  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/comments/store`,formdata , {headers:{
  //       'Authorization':`${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
  //         'Accept-Language': localStorage.getItem('language') || 'en' 
  //     }});

  //     console.log({response});
      

      
  //     setReviewText("");
  //     // toast("Thank you for your review!");
  //   } catch (error) {
  //     console.error("Error submitting review:", error);
  //     // alert("Failed to submit review. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };



// ✅ Rating submit (send JSON with headers)
const handleRatingSubmit = async () => {
  if (userRating === 0) {
    toast("Please select a rating");
    return;
  }

  const payload = { course_id: id, rating: userRating };
  console.log("Submitting rating:", payload);

  setIsSubmitting(true);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/ratings`,
      payload,
      {
        headers: {
          Authorization: `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
          "Accept-Language": localStorage.getItem("language") || "en",
        },
      }
    );

    console.log("Rating response:", response.data);
    setUserRating(0);
    toast(response.data.message);
  } catch (error) {
    console.error("Error submitting rating:", error);
    toast(error?.response?.data?.message)
  } finally {
    setIsSubmitting(false);
  }
};

// ✅ Comment submit (FormData, correct logging + headers)
const handleCommentSubmit = async () => {
  if (reviewText.trim() === "") {
    toast("Please write comment");
    return;
  }

  const formdata = new FormData();
  formdata.append("comment", reviewText);
  formdata.append("course_id", id);

  // Debugging log
  for (let [key, value] of formdata.entries()) {
    console.log(`${key}: ${value}`);
  }

  setIsSubmitting(true);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/comments/store`,
      formdata,
      {
        headers: {
          Authorization: `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
          "Accept-Language": localStorage.getItem("language") || "en",
        },
      }
    );

    console.log("Comment response:", response.data);
    setReviewText("");
    toast(response.data.message);
  } catch (error) {
    console.error("Error submitting review:", error);
     toast(error?.response?.data?.message)
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
           
          </div>
        );
      case "videos":
        return (
          <div className="prose  prose-gray max-w-none">
             <div className="max-w-7xl mx-auto p-6">
  

      {/* Videos Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

    {courseDetails?.data?.data?.lessons?.length > 0 &&<>
    
    {courseDetails?.data?.data?.lessons.map((lesson, index) => (<div key={index} className="mb-8">
      { lesson?.videos.map((video) => (
      <div
        key={video.id}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        {console.log({video})
        }
        <div className="relative w-full h-full pb-[56.25%] bg-gray-100">
          <iframe
             className="absolute top-0 left-0 w-full h-full"
            src={video.video_path}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
{/* <div className="relative w-full h-full pb-[56.25%] bg-gray-100">
  <iframe
    className="absolute top-0 left-0 w-full h-full"
    src={video.video_path.replace("watch?v=", "embed/")}
    title={video.title}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
</div> */}

       
        <div className="p-6">
           

          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
            {video.title}
          </h3>
        </div>
      </div>
    ))}
      </div>))}
    </>
      
        
      
    
    }

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
        ))}  */}
      </div>

     
    </div>
          </div>
        );
      case "files":
        return (
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">{i18n.language=="ar"? "الملفات":"files materials" }</h3>
              <ul className="space-y-2">
            {courseDetails?.data?.data?.lessons?.length > 0 ? (
                    courseDetails.data.data.lessons.flatMap((lesson, lessonIndex) => 
                        lesson.files.map((file, fileIndex) => (
                            <li key={`${lessonIndex}-${fileIndex}`} className="flex items-center justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-600">{file.title }</span>
                                {/* <a href={file.file_path}  target="_blank"  className="text-blue-600 hover:underline font-medium">Download</a> */}
                                <a
                                target="_blank"
  href={file.file_path}
  download
  className="text-yellow-600 hover:underline font-medium"
>
  {i18n.language=="ar" ? "تنزيل" :"Download"}
  
</a>

                            </li>
                        ))
                    )
                ) : (
                    <li className="py-3 text-gray-500 text-center">{i18n.language=="ar"?"لا توجد ملفات متاحة": "No lesson files available"}</li>
                )}
              </ul>
            </div>
          </div>
        );
 
  case "ratings":
        return (
          <div className="space-y-8">
            
  <div className="bg-white p-6  ">
              <h3 className="text-lg font-semibold mb-4">{i18n.language=="ar"? "تقييم الدرس": "Rate this lesson"}</h3>

              <div className=" ">
                <div className="flex justify-between items-center">
              <div className="flex flex-col  mb-4">
                <div className="flex mr-2">
                  {renderStars(0, true)}
                </div>
                <span className="text-sm text-gray-500">
                  {userRating > 0 ? `You rated: ${userRating} star${userRating > 1 ? 's' : ''}` : "Select rating"}
                </span>
              </div>
<button
                onClick={handleRatingSubmit}
                disabled={isSubmitting}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50"
              >
                {/* {isSubmitting ? "Submitting..." : "Submit Rating"} */}
                 {isSubmitting ? i18n.language=="ar"? "ارسال": "Submitting..." : i18n.language=="en"? "Submit Rating" :"ارسال"}
              </button>

                </div>

              <textarea
                className="w-full p-3 border border-yellow-300 rounded-lg mb-4 focus:ring-amber-500 focus:outline-none"
                rows={4}
                placeholder={ i18n.language =="ar" ?  "شارك تعليقك"  :"Share your experience with this lesson..."}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              
              <button
                onClick={handleCommentSubmit}
                disabled={isSubmitting}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50"
              >
                {isSubmitting ? i18n.language=="ar"? "ارسال...": "Submitting..." : i18n.language=="en"? "Submit Review" :"ارسال"}
              </button>
              </div>
              
            </div>
            <div className="space-y-6">
              {/* <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {renderStars(5)}
                  <span className="ml-2 text-gray-600">
                    {calculateAverageRating()} ({reviews.length} reviews)
                  </span>
                </div>
              </div> */}
              
              {/* {reviews.map((review) => (
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
              ))} */}

            
            </div>
          </div>
        );
      case "assignments":
        return (
          <div className="space-y-4">
            <AssignmentSubmission courseDetails={courseDetails}/>
          </div>
        );
      case "Quiz":
        return (
          <div className="space-y-4">
            <QuizSubmission courseDetails={courseDetails}/>
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
          <h1 className="text-white text-5xl font-bold">{courseDetails?.data?.data?.name}</h1>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="hover:text-custom-yellow cursor-pointer">{i18n.language=="ar" ? "الرئيسية": "Home"}</span>
            <span>›</span>
            <span className="hover:text-custom-yellow cursor-pointer">{i18n.language=="ar" ? "الدروس": "Lessons"}</span>
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
              
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 sm:mr-4 flex items-center justify-center overflow-hidden">
                    {courseDetails?.data?.data?.teacher_image ? (
                      <img 
                        src={courseDetails?.data?.data?.teacher_image} 
                        alt={courseDetails?.data?.data?.teacher || "Instructor"} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{i18n.language =="ar" ?  "المدرب" :"Instructor"}</p>
                    <p className="font-medium text-gray-900">{courseDetails?.data?.data?.teacher || ""}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-400 rounded-lg mr-3 sm:mr-4 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1"> {i18n.language =="ar" ?  "الفئة" :"Category"}</p>
                    <p className="font-medium text-gray-900">{courseDetails?.data?.data?.category || ""}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex mr-2 sm:mr-3">
                    {renderStars(courseDetails?.data?.data?.average_rating || 0)}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">
                    ({courseDetails?.data?.data?.average_rating || 0})
                  </span>
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

      <img src={courseDetails?.data?.data?.image} className="w-full h-full" alt={courseDetails?.data?.data?.average_rating+"12"} />
       

     
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
                  {i18n.language =="ar" ? "الوصف" :"Description"}
                  
                </button>
                <button
                  onClick={() => setActiveTab("videos")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "videos"
                      ? "border-yellow-400 text-yellow-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                   {i18n.language =="ar" ? "فيديوهات" :"Videos"}
                 
                </button>
                <button
                  onClick={() => setActiveTab("files")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "files"
                      ? "border-yellow-400 text-yellow-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                   {i18n.language =="ar" ? "الملفات" :"Files"}
                  
                </button>
                {/* <button
                  onClick={() => setActiveTab("comment")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "comment"
                      ? "border-yellow-400 text-yellow-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Comment
                </button> */}
                <button
                  onClick={() => setActiveTab("ratings")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "ratings"
                      ? "border-yellow-400 text-yellow-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                   {i18n.language =="ar" ? "التقييم" :"Ratings"}
                  
                </button>
                <button
                  onClick={() => setActiveTab("assignments")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "assignments"
                      ? "border-yellow-400 text-yellow-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                   {i18n.language =="ar" ? "الواجبات" :"Assignments"}
                  
                </button>
                <button
                  onClick={() => setActiveTab("Quiz")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "Quiz"
                      ? "border-yellow-400 text-yellow-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                   {i18n.language =="ar" ? "الاختبارات" :"Quiz"}
                  
                </button>
              </nav>
            </div>

            <div className="mb-12">
              {renderTabContent()}
            </div>

            {/* {activeTab === "description" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What You Will Learn</h2>
                <p className="text-gray-600 leading-relaxed">
                  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative 
                  approaches to corporate strategy foster
                </p>
              </div>
            )} */}
          </div>
        </div>
      </div>

      <CourseSlider/>
     </>}
    </div>
  );
}







// const CommentSection = () => {
//   const [comments, setComments] = useState([
//     {
//       id: 1,
//       user: 'Sarah Johnson',
//       rating: 5,
//       text: 'This course was incredibly helpful! The explanations were clear and the examples were practical.',
//       date: '2 days ago',
//       avatar: null
//     },
//     {
//       id: 2,
//       user: 'Michael Chen',
//       rating: 4,
//       text: 'Good content overall, but I wish there were more practice exercises included.',
//       date: '1 week ago',
//       avatar: null
//     }
//   ]);

//   const [newComment, setNewComment] = useState({
//     text: '',
//     rating: 0,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e) => {
//     setNewComment({
//       ...newComment,
//       text: e.target.value
//     });
//   };

//   const handleRatingChange = (rating) => {
//     setNewComment({
//       ...newComment,
//       rating
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!newComment.text.trim() || newComment.rating === 0) return;
    
//     setIsSubmitting(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       const comment = {
//         id: comments.length + 1,
//         user: 'You',
//         rating: newComment.rating,
//         text: newComment.text,
//         date: 'Just now',
//         avatar: null
//       };
      
//       setComments([comment, ...comments]);
//       setNewComment({ text: '', rating: 0 });
//       setIsSubmitting(false);
//     }, 500);
//   };

//   const RatingStars = ({ rating, onChange, interactive = false }) => {
//     return (
//       <div className="flex items-center">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             type="button"
//             onClick={() => interactive && onChange(star)}
//             className={`text-xl ${interactive ? 'cursor-pointer' : 'cursor-default'} ${
//               star <= rating ? 'text-yellow-400' : 'text-gray-300'
//             }`}
//             disabled={!interactive}
//           >
//             {/* <FaStar /> */}
//             <Star />
//           </button>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Description</h2>
//         <p className="text-gray-600 leading-relaxed">
//           This comprehensive course covers all the essential topics you need to master the subject. 
//           Through practical examples and detailed explanations, you'll gain the skills and confidence 
//           to apply what you've learned in real-world scenarios.
//         </p>
//       </div>

//       <div className="border-t border-gray-200 pt-6">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl font-semibold text-gray-800">Student Reviews</h3>
//           <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//             {comments.length} reviews
//           </span>
//         </div>

//         {/* Add Comment Form */}
//         <div className="bg-gray-50 p-5 rounded-lg mb-8">
//           <h4 className="text-lg font-medium text-gray-800 mb-4">Add Your Review</h4>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-medium mb-2">
//                 Your Rating
//               </label>
//               <RatingStars 
//                 rating={newComment.rating} 
//                 onChange={handleRatingChange} 
//                 interactive={true} 
//               />
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-medium mb-2">
//                 Your Review
//               </label>
//               <textarea
//                 value={newComment.text}
//                 onChange={handleInputChange}
//                 placeholder="Share your experience with this course..."
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 rows="4"
//               />
//             </div>
            
//             <button
//               type="submit"
//               disabled={isSubmitting || !newComment.text.trim() || newComment.rating === 0}
//               className="flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                 'Submitting...'
//               ) : (
//                 <>
//                   {/* <FaPaperPlane className="mr-2" /> */}
//                   Submit Review
//                 </>
//               )}
//             </button>
//           </form>
//         </div>

//         {/* Comments List */}
//         <div className="space-y-6">
//           {comments.map((comment) => (
//             <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0">
//               <div className="flex items-start space-x-4">
//                 <div className="flex-shrink-0">
//                   {comment.avatar ? (
//                     <img
//                       src={comment.avatar}
//                       alt={comment.user}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                   ) : (
//                     // <FaUserCircle  />
//                     <User  className="w-10 h-10 text-gray-400"/>

//                   )}
//                 </div>
                
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start">
//                     <h4 className="text-md font-semibold text-gray-800">{comment.user}</h4>
//                     <span className="text-sm text-gray-500">{comment.date}</span>
//                   </div>
                  
//                   <div className="mb-2">
//                     <RatingStars rating={comment.rating} />
//                   </div>
                  
//                   <p className="text-gray-600">{comment.text}</p>
                  
//                   <div className="mt-3 flex space-x-4">
//                     <button className="text-sm text-gray-500 hover:text-blue-600 flex items-center">
//                       <span>Helpful</span>
//                     </button>
//                     <button className="text-sm text-gray-500 hover:text-blue-600 flex items-center">
//                       <span>Reply</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

 