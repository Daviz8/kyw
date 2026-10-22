"use client";




import { motion, useReducedMotion } from "framer-motion";
import LazySection from "../components/LazySection";

import { Suspense } from "react";
import PartnerCard from "../components/partner-card";



export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (

    <LazySection>

      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>

        <main className="w-full overflow-x-hidden">

          {/* HERO SECTION \*/}

          <motion.section initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }} whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative w-full min-h-[650px] md:min-h-[650px] lg:min-h-[700px] bg-white md:bg-[url('/images/welcome.webp')] md:bg-no-repeat md:bg-[position:right_center] md:bg-[length:55%_auto]">

            <div className="mx-auto flex min-h-[650px] max-w-7xl flex-col justify-center gap-8 px-5 py-16 sm:px-8 md:min-h-[650px] md:flex-row md:items-center md:justify-start md:py-20 lg:min-h-[700px] lg:px-10">

              <div className="w-full text-center md:w-[52%] md:text-left lg:w-1/2">

                <h1 className="font-fraunces text-4xl font-bold leading-tight text-[#008080] sm:text-5xl md:text-[38px] lg:text-[44px] xl:text-5xl motion-preset-slide-right-lg motion-duration-1000 motion-delay-100 motion-ease-bounce">

                  RECHARGE,

                  <br />

                  REFRESH,

                  <br />

                  RENEW,

                  <br />

                  FOR A BETTER YOU.

                </h1>



                <p className="my-7 text-left font-lat text-base font-semibold leading-relaxed text-[#009688] sm:text-lg md:hidden ">

                  Connect with a licensed therapist anytime, anywhere from the

                  comfort of your space.

                </p>



                <p className="mt-6 hidden max-w-xl font-lat text-lg font-semibold leading-relaxed text-[#009688] md:block lg:text-xl">

                  Connect with a licensed therapist from the comfort of your

                  own space. Break down barriers to mental health care and

                  embark on a journey towards well-being, anytime, anywhere.

                </p>

                     <motion.a whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }} href="/book-a-session">

                <motion.button whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }} animate={shouldReduceMotion ? undefined : { y: [0, -3, 0] }} transition={{ y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.2 } }}

                  className="mt-4 inline-flex items-center justify-center rounded-full bg-[#009688] px-7 py-3.5 font-bold text-white transition-colors duration-300 hover:bg-[#32CD32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#008080] md:mt-8 motion-translate-y-loop-50/mirror"

                >

                  Book a Session

                </motion.button>

                 </motion.a>

              </div>

            </div>

          </motion.section>



          {/* ABOUT US SECTION \*/}

          <motion.section initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }} whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: "easeOut" }} className="bg-[linear-gradient(to_left,#041D1B,#009688,#228F22)] px-4 py-12 text-white sm:px-6 md:px-10 md:py-16 lg:px-16">

            <div className="mx-auto w-full max-w-7xl rounded-3xl border border-white/20 bg-white/10 py-8 shadow-sm backdrop-blur-md sm:py-10 md:py-14 lg:py-16  ">

              <div className="mx-auto grid w-full grid-cols-1 items-center gap-8 px-5 sm:px-8 md:gap-10 lg:grid-cols-2 lg:gap-14 lg:px-12 ">

                {/* Image \*/}

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl sm:aspect-[5/4] lg:aspect-[4/5]">

                  <img

                    src="/images/kyw.webp"

                    alt="KYW Wellness Place convener"

                    className="  object-cover md:object-fit max-md:h-auto max-md:static"

                    loading="lazy"

                  />

                  <div className=" md:absolute inset-0 bg-gradient-to-t from-black/20 to-transparent hidden md:block " />

                </div>



                {/* Text \*/}

                <div className="flex min-w-0 flex-col">

                  <h2 className="mb-7 text-center font-fraunces text-3xl font-black leading-tight text-white sm:text-4xl md:mb-9 lg:text-[40px]">

                    WHO ARE WE?

                  </h2>



                  <div className="space-y-6">

                    <p className="font-pop text-base font-semibold leading-relaxed text-white sm:text-lg md:text-xl">

                      KYW Wellness Place is a safe haven that focuses on

                      mental, emotional and physical transformation. Whether

                      you are struggling with navigating life&rsquo;s

                      challenges, managing your mental health concerns and

                      addictions, seeking clarity of purpose or aiming at

                      building a strong and healthy lifestyle for the future,

                      KYW Wellness Place is here to ignite your inner spark

                      with a touch of class.

                    </p>

                  </div>



                  <div className="mt-8 border-t border-white/30 pt-7 sm:mt-10 sm:pt-8">

                    <h3 className="mb-6 text-center font-fraunces text-3xl font-bold text-white sm:text-4xl">

                      Our Mission

                    </h3>



                    <p className="font-pop text-base font-semibold leading-relaxed text-white sm:text-lg md:text-xl">

                      We believe in the transformative power of mental

                      wellness. Our mission is to cultivate a culture of

                      compassion and understanding around mental, physical

                      and emotional health, encouraging individuals to seek

                      help and support each other in building resilient

                      communities.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </motion.section>



          {/* CORE VALUES SECTION \*/}

          <motion.section initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }} whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: "easeOut" }} className="bg-[#008080] px-4 py-12 text-white sm:px-6 md:px-10 md:py-20 lg:px-16">

            <h2 className="mb-12 text-center font-fraunces text-4xl font-bold sm:mb-16 sm:text-5xl md:mb-20 md:text-7xl lg:text-8xl">

              Core Values

            </h2>



            <div className="mx-auto grid max-w-6xl grid-cols-2 items-start justify-items-center gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14 motion-preset-fade motion-duration-1000">

              {[

                { title: "Growth", image: "/images/growth.webp" },

                {

                  title: "Confidentiality",

                  image: "/images/confidential.webp",

                },

                { title: "Care", image: "/images/help.webp" },

                { title: "Empathy", image: "/images/empathy.webp" },

                { title: "Collaboration", image: "/images/partners.webp" },

                {

                  title: "Transformation",

                  image: "/images/transformation.webp",

                },

                {

                  title: "Support",

                  image: "/images/social-services.webp",

                },

              ].map((value) => (

                <div

                  key={value.title}

                  className="flex w-full min-w-0 flex-col items-center text-center"

                >

                  <img

                    src={value.image}

                    alt=""

                    loading="lazy"

                    className="aspect-square w-24 rounded-full object-cover transition-transform duration-300 hover:scale-105 sm:w-28 md:w-36 lg:w-[157px]"

                  />

                  <h3 className="mt-4 max-w-full break-words text-lg font-bold text-white sm:text-xl md:text-2xl">

                    {value.title}

                  </h3>

                </div>

              ))}

            </div>

          </motion.section>

          {/* PARTNER WITH US SECTION \*/}
<PartnerCard/>

        </main>
      </Suspense>
    </LazySection>

  );

}
