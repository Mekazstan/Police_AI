
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, Shield } from 'lucide-react';
import ApiModal from '../components/ApiModal';
import Footer from '../components/Footer';

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3000);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <div className="pt-20 flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-police-red mb-6 appear"
                style={{ '--appear-delay': 0 } as React.CSSProperties}
              >
                Police AI
              </h1>
              
              <div 
                className="bg-police-red text-white py-4 px-6 rounded mb-12 shadow-md appear"
                style={{ '--appear-delay': 2 } as React.CSSProperties}
              >
                <h2 className="text-xl md:text-2xl font-medium">
                  Investigate Your Neighbor Or Any Person In The World.
                </h2>
              </div>
              
              <div 
                className="appear"
                style={{ '--appear-delay': 4 } as React.CSSProperties}
              >
                <Link 
                  to="/investigate" 
                  className="police-button text-lg flex items-center justify-center mx-auto group"
                >
                  <Search size={20} className="mr-2" />
                  Start Investigation
                </Link>
              </div>

              <div className="mt-16 mb-8 appear" style={{ '--appear-delay': 6 } as React.CSSProperties}>
                <a href="#services" className="text-gray-600 inline-block hover:text-police-red transition-colors">
                  <span className="block mb-2">Learn More</span>
                  <ChevronDown className="mx-auto animate-bounce" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Our Investigative Services</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="police-card flex flex-col items-center text-center appear" style={{ '--appear-delay': scrolled ? 0 : 8 } as React.CSSProperties}>
                <div className="w-16 h-16 bg-police-red bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <Shield size={32} className="text-police-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Individuals</h3>
                <p className="text-gray-600">
                  Complete background checks on any individual. Get information about their past, connections, and online presence.
                </p>
              </div>

              <div className="police-card flex flex-col items-center text-center appear" style={{ '--appear-delay': scrolled ? 2 : 10 } as React.CSSProperties}>
                <div className="w-16 h-16 bg-police-red bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <Shield size={32} className="text-police-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Businesses</h3>
                <p className="text-gray-600">
                  Verify business credentials, ownership information, and company history before making important decisions.
                </p>
              </div>

              <div className="police-card flex flex-col items-center text-center appear" style={{ '--appear-delay': scrolled ? 4 : 12 } as React.CSSProperties}>
                <div className="w-16 h-16 bg-police-red bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <Shield size={32} className="text-police-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Government agencies</h3>
                <p className="text-gray-600">
                  Support for public safety organizations with secure, reliable information and investigation tools.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center appear" style={{ '--appear-delay': scrolled ? 6 : 14 } as React.CSSProperties}>
              <Link to="/investigate" className="police-button">
                Start Your Investigation
              </Link>
            </div>
          </div>
        </section>

        {/* Alert Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Know when you are being investigated.</h2>
              <p className="text-gray-600 mb-8">
                Our alert system notifies you when someone is looking into your information. Stay informed and protected.
              </p>
              <Link to="/contact" className="police-button">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

        {/* Modal */}
        <ApiModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
