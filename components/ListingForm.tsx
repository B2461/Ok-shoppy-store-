
import React, { useState } from 'react';
import { Product } from '../types';

interface ListingFormProps {
  onClose: () => void;
  onAddListing: (product: Omit<Product, 'id'>) => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ onClose, onAddListing }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      title: title || 'Untitled Product',
      desc: description,
      price: Number(price) || 99,
      cat: category || 'Accessories',
      img: image || `https://picsum.photos/seed/${Date.now()}/800/600`,
    };
    onAddListing(newProduct);
  };

  return (
    <div id="listingForm" className="card-bg mt-5 p-4 rounded-xl flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="font-extrabold text-lg">Create Quick Listing</div>
        <button onClick={onClose} className="bg-[#ff7a00] border-0 px-4 py-2.5 rounded-lg text-[#061226] font-semibold hover:opacity-90 transition-opacity">
          Close
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input 
          value={title} onChange={e => setTitle(e.target.value)}
          className="form-input" placeholder="Product title" />
        <textarea 
          value={description} onChange={e => setDescription(e.target.value)}
          rows={3} className="form-input" placeholder="Short description"></textarea>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            value={price} onChange={e => setPrice(e.target.value)}
            type="number" className="form-input flex-1" placeholder="Price (INR)" />
          <input 
            value={category} onChange={e => setCategory(e.target.value)}
            className="form-input flex-1" placeholder="Category (E-book / Accessories / पूजा / Course)" />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <input 
            value={image} onChange={e => setImage(e.target.value)}
            className="form-input flex-1" placeholder="Image URL (optional)" />
          <button type="submit" className="w-full sm:w-auto bg-[#ff7a00] border-0 px-4 py-2.5 rounded-lg text-[#061226] font-semibold hover:opacity-90 transition-opacity">
            Publish
          </button>
        </div>
      </form>
      <div className="text-sm text-[#9aa4b2]">
        Note: This is a demo listing form — in production, images should be uploaded to secure storage and seller verification applied.
      </div>
       <style>{`
        .form-input {
            padding: 10px;
            border-radius: 10px;
            border: 0;
            background: rgba(255,255,255,0.04);
            color: #eaf3ff;
            outline: none;
        }
        .form-input:focus {
            ring: 2px;
            ring-color: #ff7a00;
        }
       `}</style>
    </div>
  );
};

export default ListingForm;
