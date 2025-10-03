
import React from 'react';

interface HeaderProps {
  onOpenListing: () => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StoreIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7h18v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z" fill="#061226" opacity="0.12" />
    <path d="M21 6h-2V4a2 2 0 0 0-2-2H7A2 2 0 0 0 5 4v2H3" stroke="#061226" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Header: React.FC<HeaderProps> = ({ onOpenListing, onSearchChange }) => {
  return (
    <header className="flex flex-col md:flex-row items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#ff7a00] to-[#ffb86b] flex items-center justify-center shadow-[0_6px_20px_rgba(255,122,0,0.12)]">
          <StoreIcon />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">ok shoppy store</h1>
          <div className="text-xs text-[#9aa4b2]">Helpline: 9305968628 • UPI: bp9305968-4@okicici</div>
        </div>
      </div>
      <div className="flex-1 w-full md:ml-5">
        <input
          onChange={onSearchChange}
          className="w-full px-4 py-3 rounded-xl border-0 bg-white/5 text-[#eaf3ff] placeholder:text-gray-500 focus:ring-2 focus:ring-[#ff7a00] outline-none transition"
          placeholder="Search e-books, accessories, पूजन items, courses..."
        />
      </div>
      <div className="flex gap-2.5">
        <button
          onClick={onOpenListing}
          className="bg-[#ff7a00] border-0 px-4 py-2.5 rounded-lg text-[#061226] font-semibold hover:opacity-90 transition-opacity"
        >
          List Your Product
        </button>
      </div>
    </header>
  );
};

export default Header;
