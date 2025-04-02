import { motion } from "framer-motion"

export default function Loading() {

   return(
    <motion.div
    animate={{opacity: 1}}
    initial={{opacity: 0}}
    className="full-w full-h d-flex flex-center">
        <span className="loader"></span>
    </motion.div>
   )
}