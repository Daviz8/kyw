"use client";


import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "../components/structural";
import PartnerCard from "../components/partner-card";



interface Content {

  title: string;

  description: string;

}



interface ContentCardProps {

  title: string;

  description: string;

}



const Contents: Content[] = [

  {

    title: "Preventive Mental Health Care",

    description:

      "We believe that mental wellness begins before a crisis occurs. Our preventive care focuses on early identification of stressors and developmental challenges in both children and adults.",

  },

  {

    title: "Addiction Counselling",

    description:

      "Recovery is a journey that requires compassion and structure. Our addiction counselling provides a non-judgmental space to address substance use and behavioral dependencies.",

  },

  {

    title: "Collaborative Care",

    description:

      "Mental health does not exist in a vacuum. We adopt a holistic approach by coordinating with other key figures in your life such as pediatricians, school teachers, or other medical specialists.",

  },

  {

    title: "Psychotherapy",

    description:

      "Our clinical psychotherapy services provide deep, evidence-based treatment for diagnosing and managing mental health disorders.",

  },

  {

    title: "Follow Up",

    description:

      "Healing is an ongoing process, not a one-time event. Our follow-up services ensure that progress is maintained long after the initial sessions are complete.",

  },

  {

    title: "Emotional Wellness Training",

    description:

      "Beyond traditional therapy, we offer practical training to build emotional intelligence and regulation skills.",

  },

  {

    title: "Individual and Group Counselling",

    description:

      "Whether you need a private space to be heard or the shared strength of a community, we have a setting for you.",

  },

  {

    title: "Mental Health Organisational Trainings",

    description:

      "We bring mental health expertise into the workplace and educational institutions.",

  },

];



function ContentCard({ title, description }: ContentCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (

    <motion.article initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }} whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut" }} whileHover={shouldReduceMotion ? undefined : { y: -5 }} className="flex h-full w-full min-w-0 flex-col rounded-2xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7">

      <h2 className="mb-5 text-center font-play-italic text-lg font-black leading-snug text-black sm:text-xl">

        {title}

      </h2>



      <p className="font-pop text-base font-semibold leading-relaxed text-gray-700 sm:text-lg">

        {description}

      </p>

    </motion.article>

  );

}



export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (

    <main className="w-full overflow-x-hidden bg-[#008080]">

      <Navbar />



      {/* MEET THE FOUNDER \*/}

      <motion.section initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }} whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full px-4 py-12 text-white sm:px-6 sm:py-16 md:px-10 lg:px-16 lg:py-20   bg-[linear-gradient(to_left,#041D1B,#009688,#32CD32)]">

        <div className="mx-auto w-full max-w-7xl">

          <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">

            {/* Founder image \*/}

            <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl shadow-xl sm:aspect-[5/4] lg:aspect-[4/5]">

              <img

                src="/images/belle.webp"

                alt="Christabel Juan Augustine, founder of KYW Wellness Place"

                className="  w-full object-contain md:object-fill max-md:h-auto max-md:static "

                fetchPriority="high"

              />



              <div

                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"

                aria-hidden="true"

              />

            </div>



            {/* Founder biography \*/}

            <div className="flex min-w-0 flex-col">

              <h1 className="mb-6 text-center font-fraunces text-3xl font-black leading-tight text-white sm:text-4xl lg:text-left lg:text-[40px]">

                MEET{" "}

                <span className="text-[#32CD32]">

                  THE FOUNDER

                </span>

              </h1>



              <div className="space-y-5 font-pop text-base font-semibold leading-relaxed text-white sm:text-lg">

                <p>

                  Christabel Juan Augustine is a Certified Child Care

                  Psychologist, a clinical and mental health counselling

                  psychologist, a strategic manager, an administrator,

                  founder of KYW Wellness Place, the host of "Know

                  Your Worth Series," and the international coordinator

                  of the Women On The Front Line Network.

                </p>



                <p>

                  Her vision reaches out to individuals who have been

                  drained by past experiences, life's challenges,

                  emotional and mental hurts, and frustration. She helps

                  them realize their potential, live healthily, and

                  contribute meaningfully to their communities.

                </p>



                <p>

                  Through her weekly broadcast, Know Your Worth Series,

                  she reaches out to numerous individuals virtually as

                  she shares practical ways to help individuals discover

                  themselves, take steps towards fulfilling their

                  destiny, navigate through life with ease, know their

                  worth, and become better versions of themselves.

                </p>



                <p>

                  She's happily married to Engr. Uche Juan Augustine,

                  and they are blessed with four supernatural children.

                </p>

              </div>



              {/* Vision \*/}

              <div className="mt-8 border-t border-white/30 pt-7 sm:mt-10 sm:pt-8">

                <h2 className="mb-4 text-center font-fraunces text-3xl font-bold sm:text-4xl lg:text-left">

                  Our Vision

                </h2>



                <p className="font-pop text-base font-semibold leading-relaxed text-white sm:text-lg">

                  Developing A Healthy Community, One Mind At A Time.

                </p>

              </div>

            </div>

          </div>

        </div>

      </motion.section>



      {/* WHAT WE DO \*/}

      <motion.section initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }} whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full bg-[#007875] px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-16 lg:py-20">

        <div className="mx-auto w-full max-w-7xl">

          <div className="mb-10 border-t border-white/20 pt-10 text-center sm:mb-14 sm:pt-12">

            <h2 className="mb-6 font-fraunces text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">

              WHAT WE DO

            </h2>



            <p className="mx-auto max-w-4xl font-pop text-base font-semibold leading-relaxed text-white sm:text-lg md:text-xl">

              We train, empower, collaborate, counsel and build individuals

              and groups through our day-to-day counselling and therapeutic

              engagements, weekly KYW Series broadcast, mental health

              sensitization tours, master classes on emotional, mental and

              physical health, and yearly mental health campaigns during

              World Mental Health Day.

            </p>

          </div>



          {/* Responsive services grid \*/}

          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8 motion-preset-fade motion-duration-1000">

            {Contents.map((item) => (

              <ContentCard

                key={item.title}

                title={item.title}

                description={item.description}

              />

            ))}

          </div>

        </div>

      </motion.section>

      {/* PARTNER WITH US \*/}
        <PartnerCard/>

    </main>

  );

}
