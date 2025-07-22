// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Menu, X, Plane, MapPin, Ticket, Stamp, Phone, Info } from 'lucide-react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-blue-600 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link href="/" className="flex items-center">
//               <Plane className="h-8 w-8 mr-2" />
//               <span className="font-bold text-xl">Travel N Ride</span>
//             </Link>
//           </div>
          
//           <div className="hidden md:flex items-center space-x-4">
//             {navLinks.map(({ href, label, Icon }) => (
//               <Link key={href} href={href} className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${pathname === href ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
//                 <Icon className="h-4 w-4 mr-1" />
//                 {label}
//               </Link>
//             ))}
//           </div>
          
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {isOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-600">
//             {navLinks.map(({ href, label, Icon }) => (
//               <Link 
//                 key={href} 
//                 href={href} 
//                 className=" px-3 py-2 rounded-md text-base font-medium flex items-center hover:bg-blue-700"
//                 onClick={toggleMenu}
//               >
//                 <Icon className="h-4 w-4 mr-2" />
//                 {label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// const navLinks = [
//   { href: '/', label: 'Home', Icon: Plane },
//   { href: '/Packages', label: 'Packages', Icon: MapPin },
//   { href: '/Tickets', label: 'Tickets', Icon: Ticket },
//   { href: '/Visa', label: ' Visa', Icon: Stamp },
//   { href: '/Services', label: 'Services', Icon: Plane },
//   { href: '/about', label: 'About', Icon: Info },
//   { href: '/Contact', label: 'Contact', Icon: Phone },
// ];

// export default Navbar;
