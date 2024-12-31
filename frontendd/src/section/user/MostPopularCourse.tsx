"use client";
import React from "react";
import VerticalProduct from "../product/VerticalProduct";

interface Course {
  id: string;
  title: string;
  // Add other course properties as needed
}

interface MostPopularCourseProps {
  courses: Course[];
}

export default function MostPopularCourse({ courses }: MostPopularCourseProps) {
  return (
    <section className="bg-primary py-16 lg:py-28" aria-labelledby="popular-courses-title">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <span className="relative inline-block px-4 py-2 text-lg font-bold capitalize text-white bg-primary-dark rounded-full mb-4 min-[1200px]:text-2xl">
            Featured Courses
          </span>
          <h2 id="popular-courses-title" className="text-4xl font-bold text-white lg:text-5xl mb-8">
            Most Popular Courses
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Discover our top-rated courses and start your learning journey today. These courses have been loved by thousands of students worldwide.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 6).map((course) => (
            <div key={course.id} className="flex justify-center">
              <VerticalProduct course={course} isHoverCardShow={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

