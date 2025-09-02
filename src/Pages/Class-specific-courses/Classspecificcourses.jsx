



import { Search, Users, MessageSquare, Star, ChevronDown } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseLayout from "../../Layouts/CourseLayout";
import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../../Redux/Apis/apiRequest";

export default function Classspecificcourses() {
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [searchTerm, setSearchTerm] = useState("");

   let {courses} = useSelector((state) => state.api);
let dispatch = useDispatch();
 console.log({courses});
   useEffect(() => {
        window.scrollTo(0, 0);
     },[]);

useEffect(() => {
  dispatch(apiRequest({
    url:"api/courses/allCourses",
    entity:"courses",
    method:"get",
    headers:{
      "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token") }`,
     'Accept-Language': localStorage.getItem('language') || 'en'
    }
  }));
}, [dispatch , localStorage.getItem("language")]);


  const popularCourses = [
    {
      id: 1,
      title: "Introduction To Mobile Apps Development",
      price: "$99.00",
      image: "/api/placeholder/80/60"
    },
    {
      id: 2,
      title: "Become A Professional Film Maker",
      price: "FREE",
      image: "/api/placeholder/80/60"
    },
    {
      id: 3,
      title: "Swift Programming For Beginners",
      price: "$75.00",
      image: "/api/placeholder/80/60"
    }
  ];

 

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="">
     <CourseLayout 
   
     courses={courses?.data}
    //  popularCourses={popularCourses}
     renderStars={renderStars}
     Breadcrumb1={"Home"}
      Breadcrumb2={"Lessons"}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}

      MainTitle={"Lessons"}
      type="course"
      

     />

     
    </div>
  );
}
