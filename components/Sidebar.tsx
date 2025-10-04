
import React, { useState } from 'react';

interface SidebarProps {
    onOpenListing: () => void;
    setRealtimeStatus: React.Dispatch<React.SetStateAction<{text: string; pulse: boolean}>>;
    onOpenDashboard: () => void;
}

const RealtimeIcon: React.FC = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" stroke="#cde6ff" strokeWidth="1.2" />
        <path d="M8 12s1-3 4-3 4 3 4 3" stroke="#cde6ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


const Sidebar: React.FC<SidebarProps> = ({ onOpenListing, setRealtimeStatus, onOpenDashboard }) => {
    const [awb, setAwb] = useState('');
    const [trackResult, setTrackResult] = useState('No tracking yet.');
    const [isTracking, setIsTracking] = useState(false);

    const trackAWB = () => {
        if (!awb) {
            setTrackResult('Please enter AWB number.');
            return;
        }
        setIsTracking(true);
        setTrackResult(`Looking up AWB ${awb}...`);
        
        const steps = ['Shipment picked up', 'In transit', 'Arrived at hub', 'Out for delivery', 'Delivered'];
        let i = 0;
        setTrackResult(steps[i]);
        setRealtimeStatus({ text: 'activity', pulse: true });

        const interval = setInterval(() => {
            i++;
            if (i < steps.length) {
                setTrackResult(steps[i]);
            } else {
                clearInterval(interval);
                setTrackResult(`Status: Delivered`);
                setRealtimeStatus({ text: 'online', pulse: false });
                setIsTracking(false);
            }
        }, 1500);
    };

    return (
        <>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-b from-[rgba(11,130,255,0.08)] to-[rgba(11,130,255,0.03)]">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-b from-white/10 to-white/[.06] flex items-center justify-center flex-shrink-0">
                   <RealtimeIcon />
                </div>
                <div>
                    <div className="font-bold">Live Tracking</div>
                    <div className="text-sm text-[#9aa4b2]">Enter courier AWB to see realtime updates.</div>
                </div>
            </div>

            <div className="card-bg p-3 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                    <div className="font-bold">Quick Seller</div>
                    <div className="text-sm text-[#9aa4b2]">Balance: ₹2,460</div>
                </div>
                <div className="flex gap-2">
                    <button onClick={onOpenListing} className="flex-1 bg-[#ff7a00] border-0 px-4 py-2.5 rounded-lg text-[#061226] font-semibold hover:opacity-90 transition-opacity">Create Listing</button>
                    <button onClick={onOpenDashboard} className="bg-[#0b84ff] border-0 px-4 py-2.5 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity">Seller Dashboard</button>
                </div>
            </div>

            <div className="card-bg p-3 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                    <div className="font-bold">Track Order</div>
                    <div className="text-sm text-[#9aa4b2]">AWB / Courier</div>
                </div>
                <div className="flex gap-2">
                    <input 
                        value={awb}
                        onChange={(e) => setAwb(e.target.value)}
                        placeholder="Enter AWB" 
                        className="flex-1 p-2.5 rounded-lg border-0 bg-white/5 text-[#eaf3ff] placeholder:text-gray-500 focus:ring-2 focus:ring-[#ff7a00] outline-none transition" />
                    <button onClick={trackAWB} disabled={isTracking} className="bg-[#ff7a00] border-0 px-4 py-2.5 rounded-lg text-[#061226] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                        {isTracking ? '...' : 'Track'}
                    </button>
                </div>
                <div className="mt-2.5 text-[#9aa4b2] text-sm">{trackResult}</div>
            </div>
        </>
    );
}

export default Sidebar;