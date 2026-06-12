"use client"

import { BlogPostCard, post } from "../components/blog-data"

export default function Blog() {
 
    return (
    <>
    <section className="grid grid-cols-2 items-center px-4 md:px-12 my-20">

      <div className="justify-self-start">
        <div className="mb-2 my-0 ">
          <hr className="w-6 mb-2 relative top-7 right-7 border-[#21B34D]" />
          <p className="font-inter text-[10px] md:text-sm text-[#21B34D]">
            Mental Health <br /> Awareness
          </p>
        </div>

        <h1 className="text-[20px] md:text-[40px] font-inter leading-tight italic mb-3 motion-scale-in-0 motion-ease-spring-bouncy text-white">
          Your <br />
          mind <br />
          deserves <br />
          gentle <br />
          attention
        </h1>

        <p className="text-[#88E288] text-[14px] md:text-[18px] leading-3 md:leading-5 motion-translate-y-in-50 motion-ease-bounce">
          Honest conversations, <br />
          grounded perspectives, <br />
          and evidence-informed <br />
          guidance for your inner <br />
          world.
        </p>
      </div>

      <div className="justify-self-end">
        <img
          src="/images/correction.webp"
          alt="hero-image"
          className="w-[160px] md:w-[300px] lg:w-[380px] max-w-full h-auto rounded-full object-cover motion-ease-linear/opacity motion-ease-spring-bouncy/rotate motion-opacity-in-0 motion-rotate-in-180"
        />
      </div>

    </section>

      <section
       className="grid grid-cols-2 items-center px-4 md:px-12 my-20 bg-[#32CD32A8]">
      <div className="justify-self-start">
        <img
        loading="lazy" 
          src="/images/hero.webp"
          alt="hero-image"
          className="motion-translate-y-in-50 motion-ease-bounce  w-[160px] md:w-[300px] lg:w-[380px] max-w-full h-auto rounded-full object-cover"
        />
      </div>

      
      <div className="justify-self-end my-36">
         
         <div className=" md:w-[249px] md:h-[479px] ">
        <h1 className=" text-[#ffffff] md:text-[32px] text-[25px] font-inter leading-tight italic mb-3 justofy-self-start">
            What Happens     <br />
            When you stop <br />
             Performing     <br />
            Wellness?     <br />
        </h1>

        <p className="text-[#ffffff] text-[12px] md:text-[18px] leading-4 md:leading-6">
       We live in an era of curated self-care morning <br />
routines and mood journals that <br />
 look better on instagram than <br />
 they feel inside.
        </p>

        <br />

           <p className="text-[#ffffff] text-[12px] md:text-[18px] leading-4 md:leading-6">
in thus deeply personal essay, <br />
we explore the quiet exhustion <br />
 of “doing everything right” and <br />
 still feeling hollow 
        </p>
         </div>
      </div>


    </section>


<section className="delayed-section" > 
<div className=" relative md:w-28 md:h-auto md:bottom-20 md:left-2 bottom-20 p-5">
   <h2 className="font-normal italic font-inter font md:text-[32px] text-[20px] leading-tight text-white">
 Recent <br />
  <span className="text-[#21B34D]"> Conversations  </span> 
     </h2>  
</div>


{/* blogcard (doc UI format ) */}
<div className="w-full px-4 py-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {post.map((Post) => (
  <BlogPostCard 
    key={Post.id}
    id={Post.id}
    title={Post.title}
    imageUrl={Post.imageUrl}
    date={Post.date}
    duration={Post.duration}
    description={Post.description}
  />
 ))}
    </div>
          </div>

<div className="w-[371px] md:h-[192px] h-[120px] md:mt-32 relative md:left-[544px] left-5 font-inter"> 

          <blockquote className="border-l-4 border-[#21B34D] pl-6 py-2 my-8 italic text-xl text-white/80 bg-white/5 motion-preset-flomoji-[🌱]">
          “Mental health  is 
          not a destination 
          but a <span className="text-[#21B34D] font-inter italic">process. </span>
           it is about how you 
           drive, not where
            you are going”
          </blockquote>

</div >

    <section className="grid grid-cols-2 items-center px-4 md:px-12 my-6 mb-20"> 
 <h2 className="text-2xl  text-[#ffffff] font-inter mt-10 mb-6"> 
  Find <span className="motion-preset-seesaw font-bold"> what </span>  <br />
    you  <span className="motion-preset-seesaw font-bold"> need  </span><br />
    right now <br />
 
    </h2>

    <br />

<p className="text-white">
curated  resources <br />
from crisis line <br />
to meditation <br />
guides 
organised by what 
you might be 
feeling today 
  
</p>

      <div className="justify-self-end md:w-[361px] w-[140px] relative right-5 p-2  h-[150px] bg-[#2E6161]">
               <h3 className="text-sm font-bold text-[#21B34D] "> Always Remember </h3>
       <img
          src="/images/contact.webp"
          alt="hero-image"
          className="md:w-[80px] w-[40px] h-[80-px] motion-preset-slide-right "
        />

        <p className="float-left text-white"> You could always contact us  </p>
      </div>

<br /> 
         <div className="justify-self-end md:w-[361px] w-[140px] relative right-5 p-4 h-[150px] bg-[#2E6161]">
       <img
          src="/images/exercise.webp"
          alt="hero-image"
          className="md:w-[80px] w-[40px] h-[80-px] motion-preset-slide-left"
        />

        <p className="float-left text-white"> Take Mindfulness& Breathing Excercise    </p>
      </div>
         <div className="justify-self-end md:w-[361px] w-[140px] relative right-5 p-2  h-[150px] bg-[#2E6161]">
               <h3 className="text-sm font-bold text-[#21B34D]  motion-preset-slide-right"> Always Remember </h3>
       <img
          src="/images/reading.webp"
          alt="hero-image"
          className="md:w-[80px] w-[40px] h-[80-px] motion-preset-slide-left"
        />

        <p className="float-left text-white"> To stay updated with our posts </p>
      </div>

<br />
         <div className="justify-self-end md:w-[361px] w-[140px] relative right-5 p-2  h-[150px] bg-[#2E6161]">
       <img
          src="/images/talking.webp"
          alt="hero-image"
          className="md:w-[80px] w-[40px] h-[80-px] motion-preset-slide-right"
        />

        <p className="float-left text-white">  Connect with kyw by booking therapy sessions </p>
      </div>

</section>


</section>

    </>
  );
}