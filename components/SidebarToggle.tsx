// SidebarToggle.tsx
import { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, LayoutDashboard, Link as LinkIcon,
  Shirt, CreditCard as CreditCardIcon,
  Package, MessageSquare, ImageIcon, VideoIcon, Music, Code, Settings, 
  ShoppingBag, User, WalletCards
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export default function SidebarToggle() {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem('sidebarExpanded');
    if (stored !== null) setIsExpanded(stored === 'true');
    console.log('Sidebar Expanded Initial:', isExpanded);
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarExpanded', String(isExpanded));
    console.log('Sidebar Expanded State Changed:', isExpanded);
  }, [isExpanded]);

  const navigationSections: NavSection[] = [
    {
      title: "MAIN NAVIGATION",
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { label: 'Marketplace', icon: ShoppingBag, href: '/marketplace' },
      ]
    },
    {
      title: "TOOLS & SERVICES",
      items: [
        { label: "Conversation", icon: MessageSquare, href: "/conversation" },
        { label: "Image Generation", icon: ImageIcon, href: "/image" },
        { label: "Video Generation", icon: VideoIcon, href: "/video" },
        { label: "Music Generation", icon: Music, href: "/music" },
        { label: "Code Generation", icon: Code, href: "/code" },
      ]
    },
  ];
  
  const accountItems: NavItem[] = [
    { label: 'Profile', icon: User, href: '/settings' },
    { label: 'Credit Balance', icon: WalletCards, href: '/billing' },
  ];

  const creditUsed = 350;
  const creditTotal = 5000;
  const creditPercentage = (creditUsed / creditTotal) * 100;
  console.log('Rendering Sidebar, Expanded:', isExpanded);

  return (
    <div
      className={`transition-all duration-300 h-screen bg-[hsl(222,50%,22%)] text-white relative flex flex-col ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-4 -right-3 z-10 bg-white text-black rounded-full p-1 shadow"
      >
        {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      <div className="flex-1 overflow-y-auto mt-10 px-4">
        {navigationSections.map((section) => {
           console.log(`Mapping section: ${section.title}`);
           return (
             <div key={section.title} className="mb-6">
                {/* Show titles only when expanded */} 
                {isExpanded && (
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{section.title}</h3>
                )}
                {/* Add spacer for MAIN NAV when collapsed */} 
                {!isExpanded && section.title === "MAIN NAVIGATION" && <div className="h-6"/>}
                
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    // Determine if item should be rendered based on section and expanded state
                    const shouldRenderItem = section.title === "MAIN NAVIGATION" || (section.title === "TOOLS & SERVICES" && isExpanded);
                    console.log(`  Item: ${item.label}, Section: ${section.title}, Expanded: ${isExpanded}, ShouldRender: ${shouldRenderItem}`);
                    
                    // Only render the LI if it should be visible
                    return shouldRenderItem ? (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-2 py-2 hover:bg-white/10 rounded cursor-pointer text-sm group",
                            pathname === item.href ? "bg-white/20 text-white font-semibold" : "text-gray-300 hover:text-white",
                            !isExpanded && "justify-center" // Center icon when collapsed
                          )}
                        >
                          <item.icon size={20} className={cn(
                              "group-hover:text-white",
                              pathname === item.href ? "text-white" : "text-gray-400"
                             )} />
                          {/* Show label only when expanded */} 
                          {isExpanded && <span className="font-medium">{item.label}</span>}
                        </Link>
                      </li>
                     ) : null; // Return null if item shouldn't be rendered
                  })}
                </ul>
              </div>
           );
         })}
      </div>
      
      <div className="px-4 mb-4 mt-auto">
        {isExpanded && (
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            ACCOUNT
          </h3>
        )}
        <ul className="space-y-1">
          {accountItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-2 py-2 hover:bg-white/10 rounded cursor-pointer text-sm group",
                  pathname === item.href ? "bg-white/20 text-white font-semibold" : "text-gray-300 hover:text-white",
                  !isExpanded && "justify-center"
                )}
              >
                <item.icon size={20} className={cn(
                    "group-hover:text-white",
                    pathname === item.href ? "text-white" : "text-gray-400"
                   )} />
                {isExpanded && <span className="font-medium">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-white/10">
        {isExpanded ? (
          <>
             <div className="text-xs text-gray-400 mb-1">Credit Used</div>
             <Progress value={creditPercentage} className="h-2 bg-gray-600 [&>*]:bg-red-500" /> 
             <div className="text-xs font-medium text-gray-300 mt-1 text-right">
                ${creditUsed} / ${creditTotal}
             </div>
          </>
        ) : (
           <div className="flex justify-center">
              <WalletCards size={20} className="text-gray-400"/>
           </div>
        )}
      </div>
    </div>
  );
} 