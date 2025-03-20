
import { useState } from 'react';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
import Footer from '../components/Footer';
import { contactService } from '../services/api';

const Contact = () => {
  const [contactData, setContactData] = useState({
    name: '',
    country: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactData.name || !contactData.country || !contactData.message) {
      toast.error("Please fill out all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await contactService.submitContact(contactData);
      
      toast.success('Message sent successfully!', {
        description: 'Our team will contact you shortly.'
      });
      
      // Reset form
      setContactData({
        name: '',
        country: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <div className="pt-20 flex-grow">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 appear" style={{ '--appear-delay': 0 } as React.CSSProperties}>
                Know when you are being investigated.
              </h1>
              
              <p className="text-lg text-center text-gray-600 mb-8 appear" style={{ '--appear-delay': 2 } as React.CSSProperties}>
                We charge monthly, contact sales:
              </p>
              
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8 appear" style={{ '--appear-delay': 4 } as React.CSSProperties}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-lg font-medium text-gray-900 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactData.name}
                      onChange={handleChange}
                      className="police-input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-lg font-medium text-gray-900 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={contactData.country}
                      onChange={handleChange}
                      className="police-input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-lg font-medium text-gray-900 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={contactData.message}
                      onChange={handleChange}
                      rows={6}
                      className="police-input resize-none"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      className="police-button w-full flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send size={20} className="mr-2" />
                          Send
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
