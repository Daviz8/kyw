
    "use client";
    import { motion,  useReducedMotion } from "framer-motion";

    export default function PartnerCard(){
        const shouldReduceMotion = useReducedMotion();
        return(       
            <motion.section initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }} whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: "easeOut" }}

                className="relative flex min-h-130 w-full items-center justify-center overflow-hidden bg-cover bg-center px-5 py-16 text-center sm:min-h-[580px] sm:px-8 md:min-h-[680px] md:px-12 lg:min-h-[760px]   bg-[url('/images/join-us.webp')] bg-cover bg-center
    md:bg-[linear-gradient(to_left,#041D1B,#009688,#32CD32)]"
            >
                <div className="relative z-10 mx-auto w-full max-w-3xl text-white">
                <h2 className="mb-6 font-fraunces text-3xl font-extrabold leading-tight sm:text-4xl md:text-[40px]  md:my-0 my-96">
                    Partner With Us
                </h2>


                <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed sm:text-lg md:text-xl">
                    Your partnership, collaboration and support will enable us to
                    train, develop and empower more youths, women, men, families
                    and society.

                </p>



                        <motion.a whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }} href="/book-a-session">
                    <motion.button whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }} animate={shouldReduceMotion ? undefined : { y: [0, -3, 0] }} transition={{ y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.2 } }}
                    className="mt-4 md:inline-flex  items-center justify-center rounded-full bg-white px-7 py-3.5 font-bold text-[#009688] hover:text-white transition-colors duration-300 hover:bg-[#32CD32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#008080] md:mt-8 motion-translate-y-loop-50/mirror"
                    >

                Donate 

                    </motion.button>
                    </motion.a>
                </div>

            </motion.section>

        )
    }
