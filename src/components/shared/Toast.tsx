import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Toast({ message }: { message: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          role="status"
          className="toast"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <Check size={17} />
          {message}
          <Link to="/garage" aria-label="Open garage">
            <ChevronRight size={17} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
