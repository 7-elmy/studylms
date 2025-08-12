import React from 'react'
import CourseLayout from '../../Layouts/CourseLayout'
import { Star } from 'lucide-react';

export default function Shop() {
    const [courses, setCourses] = React.useState( [
    {
      id: 1,
      title: "French for Beginners to Advanced Training",
      instructor: "Keny White",
      price: "$99.00",
      students: 98,
      comments: 10,
      rating: 5,
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Introduction to Mobile Apps Development",
      instructor: "Sarah Johnson",
      price: "FREE",
      students: 200,
      comments: 3,
      rating: 4,
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "How to Become a Startup Founder",
      instructor: "Jhon Milton",
      price: "$85.60",
      students: 200,
      comments: 3,
      rating: 4.5,
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      title: "Your Complete Guide to Self Development",
      instructor: "Sarah Johnson",
      price: "FREE",
      students: 48,
      comments: 5,
      rating: 5,
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      title: "Adobe InDesign CS6 Tutorial Beginners",
      instructor: "Ans Niversity",
      price: "$68.00",
      students: 48,
      comments: 5,
      rating: 5,
      image: "/api/placeholder/300/200"
    },
    {
      id: 6,
      title: "Swift Programming for Beginners",
      instructor: "Don Cooper",
      price: "$75.00",
      students: 48,
      comments: 5,
      rating: 5,
      image: "/api/placeholder/300/200"
    },
    {
      id: 7,
      title: "Become a Professional Film Maker",
      instructor: "Don Cooper",
      price: "$89.00",
      students: 48,
      comments: 5,
      rating: 5,
      image: "/api/placeholder/300/200"
    },
    {
      id: 8,
      title: "Branding like a professional in 10 days",
      instructor: "Logancee Wok",
      price: "$55.00",
      students: 48,
      comments: 5,
      rating: 5,
      image: "/api/placeholder/300/200"
    },
    {
      id: 9,
      title: "Anatomy for Figure Drawing Mastering Figure",
      instructor: "Keny White",
      price: "FREE",
      students: 48,
      comments: 5,
      rating: 5,
      image: "/api/placeholder/300/200"
    }
  ]);
    const [popularCourses, setPopularCourses] = React.useState([
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
  ]);
    const [categories, setCategories] = React.useState([
    "Business",
    "Design", 
    "Programing Language",
    "Photography",
    "Language",
    "Life Style",
    "IT & Software"
  ]);

    const [selectedCategory, setSelectedCategory] = React.useState("All Categories");
    const [searchTerm, setSearchTerm] = React.useState("");
     

  

  

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
    <div>
      <CourseLayout
      Breadcrumb1={"home" }
      Breadcrumb2={"Shop"}
        MainTitle={"Shop"}
        categories={categories}
        courses={courses}
        popularCourses={popularCourses}
        renderStars={renderStars}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        type='shop'

       
      />
    </div>
  )
}
