"use client";

import Navbar from "@/components/navbar";
// import Sidebar from "@/components/sidebar"; // Remove old sidebar import
import SidebarToggle from "@/components/SidebarToggle"; // Import the new toggle sidebar
// Remove unused imports for api limit/subscription if they are no longer fetched here
// import { getApiLimitCount } from "@/lib/api-limit";
// import { checkSubscription } from "@/lib/subscription";

// Since this is now a client component, it cannot be async
// Data fetching needs to happen differently (e.g., in a Server Component parent or via useEffect)
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // Remove data fetching if not needed directly in layout anymore
  // const apiLimitCount = await getApiLimitCount();
  // const isPro = await checkSubscription();

  return (
    <div className="h-full relative flex"> {/* Use flex to place sidebar and main side-by-side */} 
      {/* 
        The original layout used fixed positioning and padding on main.
        With a dynamic width client component sidebar, this needs adjustment.
        For now, just placing the SidebarToggle directly.
        A more robust solution might involve CSS variables or state management.
       */}
      {/* Removed the wrapper div for the sidebar initially */}
      {/* Note: SidebarToggle is a Client Component, this Layout is a Server Component. 
          This might cause hydration issues or require making the layout a client component 
          if the layout needs to react directly to the sidebar's state. 
      */}
      <SidebarToggle />
      
      {/* Adjust main content area - removing fixed padding for now */}
      {/* The main content width will need to adjust based on sidebar state */}
      <main className="flex-1 overflow-y-auto"> {/* Use flex-1 to take remaining space */} 
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
