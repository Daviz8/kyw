"use client";

import { BlogPostCard, post } from "../components/blog-data";
import { motion, useReducedMotion } from "framer-motion";

export default function Blog() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" as const },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14 } },
  };

  const card = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const revealProps = shouldReduceMotion
    ? {}
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.18 } };

  return (
    <>
      <motion.section
        className="grid grid-cols-2 items-center px-4 md:px-12 my-20"
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        variants={stagger}
      >
        <motion.div
          className="justify-self-start"
          variants={shouldReduceMotion ? undefined : fadeLeft}
        >
          <div className="mb-2 my-0">
            <hr className="w-6 mb-2 relative top-7 right-7 border-[#21B34D]" />
            <p className="font-inter text-[10px] md:text-sm text-[#21B34D]">
              Mental Health <br /> Awareness
            </p>
          </div>

          <motion.h1
            className="text-[20px] md:text-[40px] font-inter leading-tight italic mb-3 text-white"
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [0.7, 1], y: [12, 0] }
            }
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Your <br />
            mind <br />
            deserves <br />
            gentle <br />
            attention
          </motion.h1>

          <motion.p
            className="text-[#88E288] text-[14px] md:text-[18px] leading-3 md:leading-5"
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            Honest conversations, <br />
            grounded perspectives, <br />
            and evidence-informed <br />
            guidance for your inner <br />
            world.
          </motion.p>
        </motion.div>

        <motion.div
          className="justify-self-end"
          variants={shouldReduceMotion ? undefined : fadeRight}
        >
          <motion.img
            src="/images/correction.webp"
            alt="Mental health awareness"
            className="w-[160px] md:w-[300px] lg:w-[380px] max-w-full h-auto rounded-full object-cover"
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [0, 1], rotate: [12, 0], scale: [0.94, 1] }
            }
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </motion.div>
      </motion.section>

      <motion.section
        className="grid grid-cols-2 items-center px-4 md:px-12 my-20 bg-[#32CD32A8]"
        {...revealProps}
        variants={stagger}
      >
        <motion.div
          className="justify-self-start"
          variants={shouldReduceMotion ? undefined : fadeLeft}
        >
          <motion.img
            loading="lazy"
            src="/images/hero.webp"
            alt="Person reflecting on wellness"
            className="w-[160px] md:w-[300px] lg:w-[380px] max-w-full h-auto rounded-full object-cover"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="justify-self-end my-36"
          variants={shouldReduceMotion ? undefined : fadeRight}
        >
          <div className="md:w-[249px] md:h-[479px]">
            <h2 className="text-[#ffffff] md:text-[32px] text-[25px] font-inter leading-tight italic mb-3 justify-self-start">
              What Happens <br />
              When you stop <br />
              Performing <br />
              Wellness? <br />
            </h2>

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
        </motion.div>
      </motion.section>

      <section className="delayed-section">
        <motion.div
          className="relative md:w-28 md:h-auto md:bottom-20 md:left-2 bottom-20 p-5"
          {...revealProps}
          variants={shouldReduceMotion ? undefined : fadeUp}
        >
          <h2 className="font-normal italic font-inter md:text-[32px] text-[20px] leading-tight text-white">
            Recent <br />
            <span className="text-[#21B34D]">Conversations</span>
          </h2>
        </motion.div>

        {/* Blog cards */}
        <div className="w-full px-4 py-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            {...revealProps}
            variants={stagger}
          >
            {post.map((Post) => (
              <motion.div
                key={Post.id}
                variants={shouldReduceMotion ? undefined : card}
                whileHover={shouldReduceMotion ? undefined : { y: -7, scale: 1.01 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <BlogPostCard
                  id={Post.id}
                  title={Post.title}
                  imageUrl={Post.imageUrl}
                  date={Post.date}
                  duration={Post.duration}
                  description={Post.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="w-[371px] md:h-[192px] h-[120px] md:mt-32 relative md:left-[544px] left-5 font-inter"
          {...revealProps}
          variants={shouldReduceMotion ? undefined : fadeUp}
        >
          <motion.blockquote
            className="border-l-4 border-[#21B34D] pl-6 py-2 my-8 italic text-xl text-white/80 bg-white/5"
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, -3, 0], opacity: [0.88, 1, 0.88] }
            }
            transition={{
              duration: 4,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >
            “Mental health is <br />
            not a destination <br />
            but a <span className="text-[#21B34D] font-inter italic">process.</span>
            <br />
            it is about how you <br />
            drive, not where <br />
            you are going”
          </motion.blockquote>
        </motion.div>

        <motion.section
          className="grid grid-cols-2 items-center px-4 md:px-12 my-6 mb-20"
          {...revealProps}
          variants={stagger}
        >
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeLeft}
          >
            <h2 className="text-2xl text-[#ffffff] font-inter mt-10 mb-6">
              Find <motion.span
                className="font-bold"
                animate={shouldReduceMotion ? undefined : { opacity: [0.65, 1] }}
                transition={{
                  duration: 2,
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >what</motion.span>{" "}
              <br />
              you <motion.span
                className="font-bold"
                animate={shouldReduceMotion ? undefined : { opacity: [0.65, 1] }}
                transition={{
                  duration: 2.4,
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >need</motion.span>
              <br />
              right now <br />
            </h2>

            <p className="text-white">
              curated resources <br />
              from crisis line <br />
              to meditation <br />
              guides <br />
              organised by what <br />
              you might be <br />
              feeling today
            </p>
          </motion.div>

          <motion.div
            className="justify-self-end md:w-[361px] w-[140px] relative right-5 p-2 h-[150px] bg-[#2E6161]"
            variants={shouldReduceMotion ? undefined : fadeRight}
            whileHover={shouldReduceMotion ? undefined : { y: -5 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-sm font-bold text-[#21B34D]">Always Remember</h3>
            <motion.img
              src="/images/contact.webp"
              alt="Contact support"
              className="md:w-[80px] w-[40px] h-auto"
              animate={shouldReduceMotion ? undefined : { x: [0, 4, 0] }}
              transition={{
                duration: 3,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />
            <p className="float-left text-white">You could always contact us</p>
          </motion.div>

          <motion.div
            className="justify-self-end md:w-[361px] w-[140px] relative right-5 p-4 h-[150px] bg-[#2E6161]"
            {...revealProps}
            variants={shouldReduceMotion ? undefined : fadeLeft}
            whileHover={shouldReduceMotion ? undefined : { y: -5 }}
            transition={{ duration: 0.25 }}
          >
            <motion.img
              src="/images/exercise.webp"
              alt="Mindfulness and breathing exercise"
              className="md:w-[80px] w-[40px] h-auto"
              animate={shouldReduceMotion ? undefined : { x: [0, -4, 0] }}
              transition={{
                duration: 3.2,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />
            <p className="float-left text-white">
              Take Mindfulness &amp; Breathing Excercise
            </p>
          </motion.div>

          <motion.div
            className="justify-self-end md:w-[361px] w-[140px] relative right-5 p-2 h-[150px] bg-[#2E6161]"
            {...revealProps}
            variants={shouldReduceMotion ? undefined : fadeRight}
            whileHover={shouldReduceMotion ? undefined : { y: -5 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-sm font-bold text-[#21B34D]">Always Remember</h3>
            <motion.img
              src="/images/reading.webp"
              alt="Reading resources"
              className="md:w-[80px] w-[40px] h-auto"
              animate={shouldReduceMotion ? undefined : { x: [0, 4, 0] }}
              transition={{
                duration: 3.4,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />
            <p className="float-left text-white">To stay updated with our posts</p>
          </motion.div>

          <motion.div
            className="justify-self-end md:w-[361px] w-[140px] relative right-5 p-2 h-[150px] bg-[#2E6161]"
            {...revealProps}
            variants={shouldReduceMotion ? undefined : fadeUp}
            whileHover={shouldReduceMotion ? undefined : { y: -5 }}
            transition={{ duration: 0.25 }}
          >
            <motion.img
              src="/images/talking.webp"
              alt="Booking therapy sessions"
              className="md:w-[80px] w-[40px] h-auto"
              animate={shouldReduceMotion ? undefined : { x: [0, -4, 0] }}
              transition={{
                duration: 3.6,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />
            <p className="float-left text-white">
              Connect with kyw by booking therapy sessions
            </p>
          </motion.div>
        </motion.section>
      </section>
    </>
  );
}
