/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState , useEffect } from "react";
import { Post } from "../components/blog-data"

export default function BlogPage() {

  const [message, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ChoosenPost");

    if (stored) {
      try {
        const parsed: Post = JSON.parse(stored);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPost(parsed);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (eror) {
        console.error("Invalid JSON");
      }
    }
  }, []);

  return (
    <section className="min-h-screen p-6 md:p-12 font-sans selection:bg-[#21B34D] selection:text-white">
      <article className="max-w-3xl mx-auto">
        
        {/* Category Tag */}
        <span className="text-[#21B34D] font-bold tracking-widest uppercase text-sm motion-translate-y-in-100" >
    Mental Health Awareness
        </span>

        {/* Title */}
     
         <h1 className="text-white text-4xl md:text-6xl font-extrabold mt-4 mb-8 leading-tight motion-rotate-in-90">
     {message?.title}
        </h1>
        {/* Post Metadata */}
        <div className="flex items-center gap-4 text-white/70 mb-12 border-b border-white/10 pb-6 text-sm">
          <span>{message?.date}</span>
          <span className="w-1 h-1 bg-[#21B34D] rounded-full"></span>
          <span> {message?.duration} min read</span>
        </div>

        {/* Blog Body */}
        <div className="text-white text-lg leading-relaxed space-y-6 opacity-90 motion-rotate-in-90">
          <p className="first-letter:text-8xl first-letter:text-[#21B34D] first-letter:mr-1 first-letter:font-stretch-ultra-condensed   intersect:motion-preset-slide-up motion-delay-0">
            {message?.first}
          </p>

          <h3 className="text-2xl font-bold text-[#21B34D] mt-10 intersect:motion-preset-slide-up motion-delay-100 ">{message?.description} </h3>
          
          <p className="intersect:motion-preset-slide-up motion-delay-100">
            {message?.second}
          </p>

          <blockquote className="border-l-4 border-[#21B34D] pl-6 py-2 my-8 italic text-xl text-white/80 bg-white/5 intersect:motion-preset-slide-up motion-delay-100">
         " {message?.quote} "
          </blockquote>

          <p className="intersect:motion-preset-slide-up motion-delay-400">
            {message?.third}
          </p>

          <h2 className="text-2xl font-bold text-[#21B34D] mt-10 intersect:motion-preset-slide-up motion-delay-600">Summary</h2>
          <p>
          {message?.summary}
          </p>
        </div>

        {/* Footer Accent */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="bg-[#21B34D] h-1 w-24 mb-4"></div>
          <p className="text-white/50 text-sm italic">
            End of Article
          </p>
        </div>

      </article>
    </section>
  );
}