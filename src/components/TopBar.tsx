import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TopBar = () => {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <img src="/logo.svg" alt="AssetwIse Logo" className="h-8 w-auto transition-transform group-hover:scale-105" />
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 hover:after:w-full after:transition-all"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 hover:after:w-full after:transition-all"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopBar; 
