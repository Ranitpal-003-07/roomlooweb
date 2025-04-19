// src/components/PgCard.js
import React from 'react';
import { MapPin, DollarSign, ChevronRight } from 'lucide-react';

const PgCard1 = ({ pg }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={pg.image} alt={pg.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{pg.name}</h3>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
        </div>
        <div className="flex items-center mt-2 text-gray-600">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{pg.location}</span>
        </div>
        <div className="flex items-center mt-2 text-gray-900 font-medium">
          <DollarSign size={16} className="mr-1" />
          <span>₹{pg.price}/month</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {pg.amenities.map((amenity, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">Added on {pg.createdAt}</span>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center">
            Edit <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PgCard1;