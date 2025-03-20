
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { FileUp, Search } from 'lucide-react';
import Footer from '../components/Footer';
import { investigationService } from '../services/api';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define validation schema with Zod
const investigationSchema = z.object({
  personName: z.string().min(1, "Person's name is required"),
  additionalInfo: z.string().optional(),
  email: z.string().email("Valid email is required"),
  country: z.string().min(1, "Country is required")
});

// Type for the form data
type InvestigationFormValues = z.infer<typeof investigationSchema>;

const Investigate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize react-hook-form with zod validation
  const form = useForm<InvestigationFormValues>({
    resolver: zodResolver(investigationSchema),
    defaultValues: {
      personName: '',
      additionalInfo: '',
      email: '',
      country: ''
    }
  });

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      toast.info(`File selected: ${e.target.files[0].name}`);
    }
  };

  const onSubmit = async (data: InvestigationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Single API call that handles both the form data and file upload
      const response = await investigationService.submitInvestigation(data, selectedFile);
      
      toast.success('Investigation submitted successfully!', {
        description: 'You will receive your report within 24 hours.'
      });
      
      // Reset form
      form.reset();
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Failed to submit investigation', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <div className="pt-20 flex-grow">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 appear" style={{ '--appear-delay': 0 } as React.CSSProperties}>
                Start Your Investigation
              </h1>
              
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8 appear" style={{ '--appear-delay': 2 } as React.CSSProperties}>
                <p className="text-xl font-medium text-center mb-8">
                  This is an open-source security AI. The more information you submit, the more new information you will get from other people's submissions about the same person.
                </p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="border border-red-300 rounded-md p-4 md:p-6 bg-red-50 space-y-4">
                      <h3 className="text-lg font-medium border-b border-red-200 pb-2 mb-2">Investigation Details</h3>
                      
                      <FormField
                        control={form.control}
                        name="personName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="personName" className="text-sm font-medium text-gray-700">
                              What is the person's name or address?
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                id="personName"
                                className="police-input"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="additionalInfo" className="text-sm font-medium text-gray-700">
                              Anything else you will like us to know about the person?
                            </FormLabel>
                            <FormControl>
                              <textarea
                                {...field}
                                id="additionalInfo"
                                rows={2}
                                className="police-input resize-none w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-1">
                          Submit any document, file or vital information you have on the person.
                        </label>
                        <div 
                          className="police-input flex items-center cursor-pointer bg-gray-50"
                          onClick={handleFileClick}
                        >
                          <FileUp size={18} className="text-gray-500 mr-2" />
                          <span className="text-gray-500">
                            {selectedFile ? selectedFile.name : 'Choose File'}
                          </span>
                          <input
                            ref={fileInputRef}
                            type="file"
                            id="document"
                            name="document"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-300 rounded-md p-4 md:p-6 bg-gray-50 space-y-4">
                      <h3 className="text-lg font-medium border-b border-gray-200 pb-2 mb-2">Your Contact Information</h3>
                      
                      <Alert variant="default" className="bg-blue-50 border-blue-200">
                        <AlertDescription>
                          Enter your email and the country you are from to receive full investigative report you don't already have about the person in less that 24hrs.
                          <br />
                          <span className="text-xs text-gray-500 italic mt-2 block">
                            During high traffic, your investigation report could take up to a week
                          </span>
                        </AlertDescription>
                      </Alert>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="email" className="text-sm font-medium text-gray-700">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                id="email"
                                type="email"
                                className="police-input"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="country" className="text-sm font-medium text-gray-700">
                              Your Country
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                id="country"
                                className="police-input"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button 
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
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Search size={20} className="mr-2" />
                            Investigate
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Investigate;
