import React, { useState } from 'react';
import { ArrowRight, Check, Info, AlertTriangle, Calendar, Package, Ban } from 'lucide-react';
import { Badge } from './ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';

const SkipCard = ({ skip, selected, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const {
    id,
    size,
    hire_period_days,
    price_before_vat,
    vat,
    allowed_on_road,
    allows_heavy_waste
  } = skip;

  // Determine image source based on skip size
  let imageSrc;
  if (size === 4) {
    imageSrc = '/16-yard.webp';
  } else if ([5, 6, 8, 10, 12].includes(size)) {
    imageSrc = '/4-yard.webp';
  } else {
    imageSrc = `/${size}-yard.webp`;
  }

  // Calculate total price (price + VAT)
  const totalPrice = price_before_vat + vat;

  // Determine if the skip has any restrictions
  const hasRestrictions = !allowed_on_road || !allows_heavy_waste;
  const isDisabled = !allows_heavy_waste;

  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onSelect(id);
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div 
          onClick={handleClick}
          role="button"
          tabIndex={isDisabled ? -1 : 0}
          aria-selected={selected}
          aria-disabled={isDisabled}
          aria-label={`${isDisabled ? 'Not available: ' : ''}${size} yard skip`}
          onKeyDown={(e) => {
            if (isDisabled) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(id);
            }
          }}
          className={cn(
            "relative transition-all duration-300",
            "transform hover:scale-[1.02] hover:shadow-xl",
            "rounded-xl overflow-hidden border shadow-lg flex flex-col",
            "group", // For group hover effects
            !isDisabled && [
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900",
              "hover:border-blue-600/50 cursor-pointer"
            ],
            isDisabled && [
              "cursor-not-allowed opacity-75",
              "focus:outline-none focus:ring-0 focus:ring-offset-0" // Remove focus styles for disabled cards
            ],
            !imageLoaded && "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] before:animate-shine-once",
            selected && !isDisabled
              ? "ring-2 ring-blue-600 bg-gradient-to-b from-blue-900/30 to-zinc-900 border-blue-600" 
              : "bg-gradient-to-b from-zinc-800 to-zinc-900 border-zinc-700"
          )}
        >
          {/* Size Badge */}
          <Badge 
            className={cn(
              "absolute top-3 right-3 transition-all duration-300",
              "transform group-hover:translate-y-[-2px]",
              selected && !isDisabled
                ? "bg-blue-600 hover:bg-blue-600/90" 
                : isDisabled
                ? "bg-zinc-600"
                : "bg-zinc-700 group-hover:bg-blue-600/80",
              "text-white px-3 py-1 text-xs font-medium shadow-lg"
            )}
          >
            {size} Yards
          </Badge>
          
          {/* Selected Indicator */}
          {selected && !isDisabled && (
            <div className="absolute top-3 left-3 bg-blue-600 rounded-full p-1.5 shadow-lg animate-pulse-subtle">
              <Check className="h-4 w-4 text-white" />
            </div>
          )}

          {/* Disabled Indicator */}
          {isDisabled && (
            <div className="absolute top-3 left-3 bg-zinc-600 rounded-full p-1.5 shadow-lg">
              <Ban className="h-4 w-4 text-zinc-400" />
            </div>
          )}
          
          {/* Skip Image */}
          <div className={cn(
            "pt-10 pb-4 px-0 flex items-center justify-center h-48 relative z-0",
            isDisabled && "opacity-75"
          )}>
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <img 
                src={imageSrc}
                alt={`${size} Yard Skip`}
                className="w-full max-h-44 object-contain object-center mx-auto block scale-110 transition-transform duration-300 group-hover:scale-[1.15] group-hover:rotate-y-3"
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
          
          {/* Skip Details */}
          <div className="p-6 flex-1 flex flex-col space-y-4">
            <div>
              <h3 className={cn(
                "text-xl font-bold transition-colors duration-300",
                isDisabled ? "text-zinc-500" : "text-white group-hover:text-blue-500"
              )}>
                {size} Yard Skip
              </h3>
              <div className="flex items-center gap-2 text-zinc-400 text-sm mt-1">
                <Calendar className="h-4 w-4" />
                <span>{hire_period_days} day hire period</span>
              </div>
            </div>
            
            {/* Price Display */}
            <div className="relative space-y-2">
              <div className="flex items-baseline gap-1">
                <span className={cn(
                  "text-3xl font-bold drop-shadow-sm",
                  isDisabled ? "text-zinc-500" : "text-blue-500"
                )}>
                  £{totalPrice}
                </span>
                <span className="text-sm text-zinc-400">inc. VAT</span>
              </div>
              <div className="my-1 h-px bg-zinc-700/50" />
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Price before VAT:</span>
                  <span className="text-white font-medium">£{price_before_vat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">VAT:</span>
                  <span className="text-white font-medium">£{vat}</span>
                </div>
              </div>
              <div className={cn(
                "absolute -right-2 -top-2 w-16 h-16 rounded-full blur-xl transition-colors duration-300",
                isDisabled ? "bg-zinc-600/10" : "bg-blue-600/10 group-hover:bg-blue-600/20"
              )} />
            </div>
            
            {/* Restrictions */}
            <div className="mt-2 space-y-2 flex-grow">
              {!allowed_on_road && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 bg-amber-900/30 text-amber-400 rounded-md px-3 py-2 text-xs hover:bg-amber-900/40 transition-colors duration-200">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 animate-pulse-subtle" />
                      <span>Not Allowed On Road</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This skip must be placed on private property</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              {!allows_heavy_waste && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 bg-red-900/30 text-red-400 rounded-md px-3 py-2 text-xs hover:bg-red-900/40 transition-colors duration-200">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 animate-pulse-subtle" />
                      <span>Not Suitable for Heavy Waste</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This skip is not suitable for heavy materials like concrete or soil</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            
            {/* Button */}
            <div className="mt-4">
              {selected && !isDisabled ? (
                <div className="w-full py-2.5 rounded-lg font-medium bg-blue-600 text-white text-center flex items-center justify-center gap-2 animate-pulse-subtle">
                  <Check className="h-4 w-4" />
                  Selected
                </div>
              ) : (
                <div className={cn(
                  "w-full py-2.5 rounded-lg font-medium text-center flex items-center justify-center gap-2 transition-all duration-300",
                  "transform hover:translate-y-[-1px]",
                  isDisabled
                    ? "bg-zinc-700/30 text-zinc-500 cursor-not-allowed"
                    : hasRestrictions
                    ? "bg-zinc-700/50 text-zinc-500"
                    : "bg-zinc-700 text-white group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/20"
                )}>
                  {isDisabled ? (
                    <>
                      Not Available
                      <Ban className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Select This Skip
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      
      <HoverCardContent 
        className="w-80 p-4 bg-zinc-900 border-zinc-700 shadow-xl"
        sideOffset={5}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-blue-500" />
            <h4 className="font-semibold text-white">Skip Details</h4>
          </div>
          <div className="space-y-2 text-sm text-zinc-300">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Perfect for {size} yards of waste
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              {hire_period_days} day hire period
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Price includes VAT
            </p>
            {!allowed_on_road && (
              <p className="flex items-center gap-2 text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Must be placed on private property
              </p>
            )}
            {!allows_heavy_waste && (
              <p className="flex items-center gap-2 text-red-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Not suitable for heavy materials
              </p>
            )}
          </div>
          <div className="pt-2 text-xs text-zinc-400 flex items-center gap-1">
            {isDisabled ? (
              <>
                <Ban className="h-3 w-3" />
                This skip is not available for your needs
              </>
            ) : (
              <>
                <Info className="h-3 w-3" />
                Click to select this skip size
              </>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default SkipCard;
