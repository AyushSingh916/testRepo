'use client';
import { useState } from "react";

interface Course {
  id: number;
  name: string;
  topics: string[];
}

const coursesData: Course[] = [
  { id: 1, name: "Course 1", topics: ["1.1 Topic 1", "1.2 Topic 2", "1.3 Topic 3"] },
  { id: 2, name: "Course 2", topics: ["2.1 Topic 1", "2.2 Topic 2", "2.3 Topic 3"] },
  { id: 3, name: "Course 3", topics: ["3.1 Topic 1", "3.2 Topic 2", "3.3 Topic 3"] },
  { id: 4, name: "Course 4", topics: ["4.1 Topic 1", "4.2 Topic 2", "4.3 Topic 3"] },
  { id: 5, name: "Course 5", topics: ["5.1 Topic 1", "5.2 Topic 2", "5.3 Topic 3"] },
  { id: 6, name: "Course 6", topics: ["6.1 Topic 1", "6.2 Topic 2", "6.3 Topic 3"] },
  { id: 7, name: "Course 7", topics: ["7.1 Topic 1", "7.2 Topic 2", "7.3 Topic 3"] },
];

export default function Home() {
  const [activeCourse, setActiveCourse] = useState<number | null>(3);
  const [activeTopic, setActiveTopic] = useState<string | null>("3.2");
  const [unlockedCourses, setUnlockedCourses] = useState<number[]>([1, 2, 3]);

  const handleCourseSelection = (courseId: number) => {
    if (unlockedCourses.includes(courseId)) {
      setActiveCourse(courseId);
      setActiveTopic(null);
    }
  };

  const handleTopicSelection = (topic: string) => {
    setActiveTopic(topic);
  };

  const toggleLock = (courseId: number) => {
    setUnlockedCourses(prevState =>
      prevState.includes(courseId) ? prevState.filter(id => id !== courseId) : [...prevState, courseId]
    );
  };

  return (
    <div className="p-4">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 w-64">
        <ul>
          {coursesData.map(course => (
            <li key={course.id} className={`mb-2 ${activeCourse === course.id ? 'bg-gray-700' : ''}`}>
              <div className="flex items-center justify-between">
                <span
                  className={`cursor-pointer ${unlockedCourses.includes(course.id) ? '' : 'opacity-50'}`}
                  onClick={() => handleCourseSelection(course.id)}
                >
                  {`${course.id < 10 ? `0${course.id}` : course.id}. ${course.name}`}
                </span>
                <button
                  className="ml-2 text-sm"
                  onClick={() => toggleLock(course.id)}
                >
                  {unlockedCourses.includes(course.id) ? '🔓' : '🔒'}
                </button>
              </div>
              {activeCourse === course.id && (
                <ul className="ml-4 mt-2">
                  {course.topics.map(topic => (
                    <li
                      key={topic}
                      className={`cursor-pointer ${activeTopic === topic ? 'text-red-400' : ''}`}
                      onClick={() => handleTopicSelection(topic)}
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        {activeTopic && <h2 className="text-xl">Selected Topic: {activeTopic}</h2>}
      </div>
    </div>
  );
}
