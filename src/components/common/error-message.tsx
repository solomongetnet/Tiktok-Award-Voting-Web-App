import { AlertCircle } from "lucide-react";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface IProps {
  error: any;
  className?: string;
  withIcon?: boolean;
}

const ErrorMessage: FC<IProps> = ({ error, className, withIcon = true }) => {
  if (!error) return null;

  return (
    <motion.span
      className={twMerge(
        `flex items-center gap-2 text-[#d44b4b] font-semibold text-sm ${className}`
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {withIcon && <AlertCircle className="w-4" />}
      <span>{error}</span>
    </motion.span>
  );
};

export default ErrorMessage;
