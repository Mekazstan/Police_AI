
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Every user is solely responsible for the information he or she provided.
          </p>
          
          <p className="text-sm text-gray-600 mb-6">
            © {currentYear} Police AI. All rights reserved.
          </p>
          
          <div className="flex justify-center space-x-12 mb-6">
            <span className="text-gray-800 font-medium">• Individuals</span>
            <span className="text-gray-800 font-medium">• Businesses</span>
            <span className="text-gray-800 font-medium">• Government agencies</span>
          </div>
          
          <p className="text-police-red text-sm font-medium">
            Share to family & friends to know when people are investigating them.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
