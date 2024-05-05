import { SignUp } from "@/components/madeups/sigin-up";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import React from "react";
type Props = {};

const page = (props: Props) => {
  return (
    // <AuroraBackground>
    //   <motion.div
    //     initial={{ opacity: 0.0, y: 40 }}
    //     whileInView={{ opacity: 1, y: 0 }}
    //     transition={{
    //       delay: 0.3,
    //       duration: 0.8,
    //       ease: "easeInOut",
    //     }}
    //     className="relative flex flex-col gap-4 items-center justify-center px-4"
    //   >
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <SignUp />
    // </main>
    //   </motion.div>
    // </AuroraBackground>
  );
};

export default page;
