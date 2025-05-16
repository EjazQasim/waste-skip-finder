import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, PackageCheck, TruckIcon, Calendar, CreditCard, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import SkipCard from '../components/SkipCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const SkipSelectPage = () => {
  const [skips, setSkips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postcode, setPostcode] = useState('NR32');
  const [area, setArea] = useState('Lowestoft');
  const [selectedSkipId, setSelectedSkipId] = useState(null);
  const [selectedSkip, setSelectedSkip] = useState(null);
  // https://app.wewantwaste.co.uk/api/permits/by-location?postcode=LE10&area=Hinckley
  const fetchSkips = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      setSkips(data);
    } catch (err) {
      console.error('Failed to fetch skips:', err);
      setError(err.message || 'Failed to load skip data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkips();
  }, [postcode, area]);

  useEffect(() => {
    // Update selected skip details when selection changes
    if (selectedSkipId) {
      const skip = skips.find(s => s.id === selectedSkipId);
      setSelectedSkip(skip);
    } else {
      setSelectedSkip(null);
    }
  }, [selectedSkipId, skips]);

  const handleSkipSelect = (skipId) => {
    // Toggle selection
    setSelectedSkipId(prevId => prevId === skipId ? null : skipId);
  };

  const handleContinue = () => {
    if (selectedSkipId) {
      toast({
        title: "Skip Selected",
        description: `You've selected a ${selectedSkip?.size} yard skip.`,
        variant: "default",
      });
    }
  };

  // Current step in the process (3 out of 6)
  const currentStep = 3;
  const totalSteps = 6;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Progress Steps - Redesigned */}
        <div className="mb-12">
          <div className="relative">
            {/* Progress bar */}
            <Progress value={progressPercentage} className="h-2 bg-zinc-800" />
            {/* Steps - Responsive */}
            <div className="overflow-x-auto w-full mt-4">
              <div className="flex flex-nowrap justify-between gap-4 sm:gap-6 px-1">
                {/* Step 1 - Postcode */}
                <div className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' : 'bg-zinc-800 text-zinc-500'} transition-all duration-300 shadow-lg`}>
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className={`mt-1 text-[10px] sm:mt-2 sm:text-xs text-center ${currentStep >= 1 ? 'text-blue-500' : 'text-zinc-500'}`}>Postcode</span>
                </div>
                {/* Step 2 - Waste Type */}
                <div className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' : 'bg-zinc-800 text-zinc-500'} transition-all duration-300 shadow-lg`}>
                    <PackageCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className={`mt-1 text-[10px] sm:mt-2 sm:text-xs text-center ${currentStep >= 2 ? 'text-blue-500' : 'text-zinc-500'}`}>Waste Type</span>
                </div>
                {/* Step 3 - Select Skip */}
                <div className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                    currentStep === 3
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                      : currentStep > 3
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                        : 'bg-zinc-800 text-zinc-500'
                  } transition-all duration-300`}>
                    <TruckIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className={`mt-1 text-[10px] sm:mt-2 sm:text-xs font-medium text-center ${currentStep >= 3 ? 'text-blue-500' : 'text-zinc-500'}`}>Select Skip</span>
                </div>
                {/* Step 4 - Permit Check */}
                <div className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' : 'bg-zinc-800 text-zinc-500'} transition-all duration-300 shadow-lg`}>
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className={`mt-1 text-[10px] sm:mt-2 sm:text-xs text-center ${currentStep >= 4 ? 'text-blue-500' : 'text-zinc-500'}`}>Permit Check</span>
                </div>
                {/* Step 5 - Choose Date */}
                <div className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${currentStep >= 5 ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' : 'bg-zinc-800 text-zinc-500'} transition-all duration-300 shadow-lg`}>
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className={`mt-1 text-[10px] sm:mt-2 sm:text-xs text-center ${currentStep >= 5 ? 'text-blue-500' : 'text-zinc-500'}`}>Choose Date</span>
                </div>
                {/* Step 6 - Payment */}
                <div className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${currentStep >= 6 ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' : 'bg-zinc-800 text-zinc-500'} transition-all duration-300 shadow-lg`}>
                    <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className={`mt-1 text-[10px] sm:mt-2 sm:text-xs text-center ${currentStep >= 6 ? 'text-blue-500' : 'text-zinc-500'}`}>Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">Choose Your Skip Size</h1>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg">
            Select the skip size that best suits your needs
          </p>
        </div>
        
        {/* Skips Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorDisplay message={error} onRetry={fetchSkips} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {skips.map((skip) => (
              <SkipCard 
                key={skip.id} 
                skip={skip} 
                selected={skip.id === selectedSkipId}
                onSelect={handleSkipSelect}
              />
            ))}
            
            {skips.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-zinc-400">
                  No skips available for this area. Please try a different location.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Selected Skip Info - Fixed to bottom */}
        {selectedSkip && (
          <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600/20 p-2 rounded-lg">
                  <TruckIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium text-white">
                    {selectedSkip.size} Yard Skip
                  </h3>
                  <p className="text-sm text-blue-500 font-bold">
                    £{selectedSkip.price_before_vat + selectedSkip.vat}
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleContinue}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continue
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {skips.length > 0 && !selectedSkip && (
          <div className="mt-12 flex justify-between">
            <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300">
              Back
            </Button>
            <Button 
              className={`${
                selectedSkipId ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-zinc-800 text-zinc-500'
              }`}
              disabled={!selectedSkipId}
              onClick={handleContinue}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkipSelectPage;
