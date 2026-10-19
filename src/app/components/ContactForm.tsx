/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current || loading) return;

    setLoading(true);

    try {
      await emailjs.sendForm(
        `${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}`,
        form.current,
        {
          publicKey: `${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}`,
        }
      );

      console.log("SUCCESS!");
      window.location.reload();
    } catch (error: any) {
      console.log("FAILED...", error?.text);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-[636px] pb-[196px] space-y-12 mx-auto px-7 motion-preset-fade motion-duration-5000">
      <h1 className="md:text-[40px] text-[30px] text-white leading-[100%] font-play-italic font-black text-center">
        Have a question, idea, or project in mind?
      </h1>

      <p className="text-center text-lg text-white">
        Whether you are seeking specialized developmental support for your
        child or professional counseling for your own mental well-being, I am
        here to help. We are open to new connections and creative possibilities.
        We'd love to hear from you.
      </p>

      <form
        className="space-y-9"
        ref={form}
        onSubmit={sendEmail}
      >
        <div className="space-y-[10px]">
          <label className="block font-bold text-base text-white">
            Your email address
          </label>

          <input
            type="email"
            name="email"
            required
            disabled={loading}
            className="border block outline-[#32CD32] border-[#353535] h-[63px] bg-white rounded-[15px] w-full text-black px-4 disabled:opacity-70"
          />
        </div>

        <div className="space-y-[10px]">
          <label className="block font-bold text-base text-white">
            Your Name
          </label>

          <input
            type="text"
            name="name"
            required
            disabled={loading}
            className="border outline-[#32CD32] block border-[#353535] h-[63px] bg-white rounded-[15px] w-full text-black px-4 disabled:opacity-70"
          />
        </div>

        <div className="space-y-[10px]">
          <label className="block font-bold text-base text-white">
            Message
          </label>

          <textarea
            name="message"
            required
            disabled={loading}
            className="border block outline-[#32CD32] border-[#353535] h-[247px] resize-none bg-white rounded-[15px] w-full text-black p-4 disabled:opacity-70"
          />
        </div>

        <div className="pt-[17px] max-w-[212px] mx-auto">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#32CD32] text-white h-11 rounded-full w-full font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>

                Sending...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}