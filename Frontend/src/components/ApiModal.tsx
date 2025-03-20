
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ApiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiModal = ({ isOpen, onClose }: ApiModalProps) => {
  const [animationClass, setAnimationClass] = useState('opacity-0 scale-95');

  useEffect(() => {
    let timer: number;
    if (isOpen) {
      timer = window.setTimeout(() => {
        setAnimationClass('opacity-100 scale-100');
      }, 10);
    } else {
      setAnimationClass('opacity-0 scale-95');
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleOk = () => {
    toast.success('API access granted', {
      description: 'You can now use our API directly'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className={`bg-white rounded-md shadow-xl p-6 max-w-md w-full transition-all duration-300 transform ${animationClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">For faster investigations, use our police AI api directly.</h2>
          
          <button onClick={handleOk} className="police-button w-full sm:w-auto">
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiModal;
