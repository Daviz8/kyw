import { Navbar , Footer } from "../components";
import { FC } from "react";

export default function About() {

   interface Content {
  title: string;
  description: string;
}

interface ContentCardProps {
  title: string;
  description: string;
}
 
const ContentCard : FC<ContentCardProps>  = ({ title, description }) => {
  return (
    <div className="card my-10">
      <div className="content">
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
        </svg>
        <h1 className="md:text-[20px] text-[18px] mb-6 text-black leading-[100%] italic font-play-italic font-black text-center"> {title} </h1>
        <p className="para md:text-lg text-[16px] font-pop font-semibold text-left">
          {description}
        </p>
      </div>
    </div>
  );
};


const Contents : Content[] = [
   {
  title: 'Preventive Mental Health Care',
  description:'We believe that mental wellness begins before a crisis occurs. Our preventive care focuses on early identification of stressors and developmental challenges in both children and adults.', 
      },
              {
  title: 'Addiction Counselling',
  description:'Recovery is a journey that requires compassion and structure. Our addiction counselling provides a non-judgmental space to address substance use and behavioral dependencies.', 
      }, 
        {
  title: 'Collaborative Care',
  description:'Mental health does not exist in a vacuum. We adopt a holistic approach by coordinating with other key figures in your life—such as pediatricians, school teachers, or other medical specialists.', 
      }, 

      {
  title: 'Psychotherapy',
  description:'Our clinical psychotherapy services provide deep, evidence-based treatment for diagnosing and managing mental health disorders.', 
      }, 
  
      {
  title: 'Follow Up',
  description:'Healing is an ongoing process, not a one-time event. Our follow-up services ensure that progress is maintained long after the initial sessions are complete.', 
      }, 
         {
  title: 'Emotional Wellness Training',
  description:'Beyond traditional therapy, we offer practical training to build emotional intelligence and regulation skills.', 
      },
             {
  title: 'Individual and Group Counselling',
  description:'Whether you need a private space to be heard or the shared strength of a community, we have a setting for you.', 
      },
             {
  title: 'Mental Health Organisational Trainings',
  description:'We bring mental health expertise into the workplace and educational institutions', 
      },
      
]


  return(
        <>
<section> 

<Navbar/>

    <div className="relative w-fit py-12 md:py-20 rounded-3xl">
  <div className="max-w-full mx-auto px-6 md:px-12 lg:px-16">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* Image Section */}
      <div className="relative h-[300px] md:h-[650px] w-full overflow-hidden rounded-2xl shadow-xl">
        <img 
          src="/images/belle-smile.png" 
          alt="kyw convener"
          className="w-fit h-fit md:h-fit md:w-fit"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col">
        <h3 className="text-[40px] mb-6 text-white leading-[100%] italic font-play-italic font-black text-center">
   MEET <span  className="text-[#32CD32]">THE FOUNDER  </span>
        </h3>
        
        <div className="space-y-6 text-gray-700 leading-relaxed md:text-lg font-medium">
          <p className=" md:text-lg text-lg  text-white font-semibold font-pop">

Christabel Augustine is a Certified Child Care Psychologist,
A Cinicaland mental health counseling psychologist, A
Strategic manager, An Administrator, Founder, KYW Wellness
Place, The Host of "Know Your Worth Series" and The International
Coordinator of the Women On The Front Line Network.
Her vision reachesout to individuals who have been drained
from the past experiences of life's challenges, emotional and
mental hurts and frustration bringing them out to realize their
potentials, live healthily and contribute meaningfullyto their
communities.
<br />
<br />
Through her weekly broadcast - Know Your Worth Series, she
reaches out to numerous individuals virtually as she shares
practical ways to help individuals discover themselves,take
stepsto fulfilling destiny, navigatethrough life with ease, know
their worth and become better versions of themselves.
She's Happily married to Engr. Uche Juan Augustineand they
are blessed with four supernatural children; John, Anna,
Eden and Juanita.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
<h3 className="text-[40px] text-white italic font-play-italic font-bold text-center mb-2"> Our vision: </h3>
          <p className="text-lg md:text-lg font-semibold uppercase tracking-widest text-white font-pop">
Developing healthy communitie, one mind at a time.
          </p>
        </div>
      </div>

    </div>
  </div>
</div>
</section>



<section
  className="w-full min-h-screen bg-cover bg-center ">
      <div className="mt-8 pt-6 border-t border-gray-100"></div>
<div className="max-w-full mx-auto px-4 py-12 flex flex-col justify-center items-center ">
 <h1 className="text-[30px] md:text-[60px] font-bold text-white leading-snug  font-play-italic italic relative top-10"> WHAT WE DO </h1> 

<p className="md:text-lg text-lg leading-relaxed text-white font-semibold font-pop space-y-6 p-20">
   We train, empower, collaborate, counsel andbuild
individuals and groups through our day to day
counseling & therapeutic engagements,weekly  <br className="md:hidden" /> <br className="md:hidden" />
KYW Series broadcast, mentalhealth sensitization tours,
master classes on emotional, mentaland physical
health and yearly mentalhealth campaigns during
world mental health day.
    </p>

</div>

<div className="flex flex-col items-center gap-10 md:p-10 md:flex-row md:flex-wrap md:justify-center md:gap-12 mb-20"> 
{Contents.map((Contents, index) => (
<ContentCard
            key={index}
            title={Contents.title}
            description={Contents.description}
/>
))}
   </div>
</section>


<section
        className="relative w-full h-[80vh] md:w-[1440px] md:h-[817px] flex items-center justify-center text-center bg-cover bg-center md:p-44 "
        style={{ backgroundImage: "url('/images/join-us.png')" }}
      >
        <div className="absolute inset-0 bg-black/50 w-fit h-fit"></div>
        <div className="relative max-w-3xl mx-auto text-white px-4">
          <h1 className="text-[30px] md:text-[60px] font-extrabold mb-6 font-play relative top-52 md:top-0">
        Partner With Us
          </h1>
          <p className="text-lg md:text-lg mb-8 relative top-52 md:top-0">
Your partnership, collaboration and support  <br className="hidden md:block" /> 
will enable us to train,develop and empower <br className="hidden md:block" />
more youths,women, men, fanilies & the society.
          </p>
        </div>
      </section>



<Footer/>
        </>
    )
 }