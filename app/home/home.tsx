/* eslint-disable @next/next/no-img-element */
"use client";

export default function Home() {
    return(
        <>
<section
  className="w-full min-h-screen bg-cover bg-center"
  style={{ backgroundImage: "url('/images/kyw-wave-bg.png')" }}
>
  <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center md:flex-row md:justify-between gap-10">

    {/* TEXT */}
    <div className="w-full md:w-1/2 text-center md:text-left">
      <h1 className="text-2xl sm:text-3xl md:text-[40px] text-[#008080] leading-snug text-left italic font-play-italic font-semibold">
      ...RECHARGE, <br />
      REFRESH, <br />
        RENEW, <br />
        FOR A BETTER YOU. <br />
      </h1>

      {/* Mobile text */}
      <p className=" text-[#009688]  font-semibold md:hidden my-10 text-left font-lat ">
        Connect with a licensed therapist anytime, anywhere <br />
         from the comfort of your space.
      </p>

      {/* Desktop text */}
      <p className="mt-6 text-lg md:text-xl text-[#009688]  hidden md:block font-lat font-semibold">
        Connect with a licensed therapist from the comfort of your own
        space. Break down barriers to mental health care and embark on a
        journey towards well-being, anytime, anywhere.
      </p>

      <button className="mt-6 px-6 py-3 rounded-full bg-[#009688] text-white font-bold sm:w-auto hover:bg-[#32CD32] animate-bounce">
        Book a Session
      </button>
    </div>

    {/* IMAGE */}
    <div className="w-full md:w-1/2 flex justify-center">
      <img
        src="/images/hero-image.png"
        alt="Hero"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded-2xl shadow-xl"
      />
    </div>

  </div>
</section>


 <section className=" text-white py-20 px-4 md:px-16 bg-[#008080]">
<div className="relative w-full py-12 md:py-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
  <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* Image Section */}
      <div className="relative h-[300px] md:h-[650px] w-full overflow-hidden rounded-2xl shadow-xl">
        <img 
          src="/images/belle.png" 
          alt="kyw convener"
          className="w-fit h-fit md:h-fit md:w-fit"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col">
        <h3 className="text-[40px] mb-10 text-[#15d015] border-amber-50 leading-[100%] italic font-play-italic font-black text-center">
          WHO ARE WE ?
        </h3>
        
        <div className="space-y-6 text-gray-700 leading-relaxed md:text-lg font-medium">
          <p className=" md:text-xl text-xl  text-white font-semibold font-pop">
KYW Wellness Place is a safe haven
Us and physical transformation.
Whether you are struggling with navigating life's
challenges, managing your mental healthconcerns
and addictions, seeking clarity of purpose or aiming at
building astrong and healthy lifestyle for the future...
KYW Wellness Place is here to ignite your inner spark with
a touch of class.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
<h3 className="text-[40px] text-[#15d015] italic font-play-italic font-bold text-center mb-10 outline-amber-50"> Our Mission: </h3>
          <p className="text-xl font-semibold uppercase tracking-widest text-white font-pop">
             We believe in the transformative power of mental
Wellness, ourmission is to cultivate acultureof
compassion and understanding around mental, physical
and emotional health, encouraging individuals to
seek helpand support each other in building resilient
Communities.
          </p>
        </div>
      </div>

    </div>
  </div>
</div>


</section>

<section className=" text-white py-20 px-4 md:px-16 bg-[#008080]">
        <em>
          {" "}
          <h2 className="text-4xl md:text-8xl h-white py-20 font-bold text-center font-play-italic">
            {" "}
            Core Values{" "}
          </h2>{" "}
        </em>

<div className="flex flex-col items-center gap-8 md:flex-row md:flex-wrap md:justify-center md:gap-12 mb-20">
  <div className="flex flex-col items-center text-center md:w-1/4">
    <img
      className="w-[157px] h-[156px] rounded-full  hover:scale-105 transition-transform duration-300"
      src="/images/growth.png"
      alt="icons"
    /> 
    <h6 className="text-white font-bold text-2xl mt-4 "> Growth </h6>
  </div>

  <div className="flex flex-col items-center text-center md:w-1/4">
    <img
      className="w-[157px] h-[156px] rounded-full  hover:scale-105 transition-transform duration-300"
      src="/images/confidential.png"
      alt="icons"
    />
    <h6 className="text-white font-bold text-2xl mt-4"> Confidentiality </h6>
  </div>

  <div className="flex flex-col items-center text-center md:w-1/4">
    <img
      className="w-[157px] h-[156px] rounded-full  hover:scale-105 transition-transform duration-300"
      src="/images/help.png"
      alt="icons"
    />
    <h6 className="text-white font-bold text-2xl mt-4"> Care </h6>
    
  </div>

  <div className="flex flex-col items-center text-center md:w-1/4">
    <img
      className="w-[157px] h-[156px] rounded-full  hover:scale-105 transition-transform duration-300"
      src="/images/empathy.png"
      alt="icons"
    />
    <h6 className="text-white font-bold text-2xl mt-4"> Empathy </h6>
  </div>

  <div className="flex flex-col items-center text-center md:w-1/4">
    <img
      className="w-[157px] h-[156px] rounded-full  hover:scale-105 transition-transform duration-300"
      src="/images/partners.png"
      alt="icons"
    />
    <h6 className="text-white font-bold text-2xl mt-4"> Collaboration </h6>
  </div>
    <div className="flex flex-col items-center text-center md:w-1/4">
    <img
      className="w-[157px] h-[156px] rounded-full  hover:scale-105 transition-transform duration-300"
      src="/images/transformation.png"
      alt="icons"
    />
    <h6 className="text-white font-bold text-2xl mt-4">Transformation</h6>
  </div>
    <div className="flex flex-col items-center text-center md:w-1/4">
    <img
      className="w-[157px] h-[156px] rounded-full  hover:scale-105 transition-transform duration-300"
      src="/images/social-services.png"
      alt="icons"
    />
    <h6 className="text-white font-bold text-2xl mt-4">Support</h6>
  </div>
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


        </>
    )
}