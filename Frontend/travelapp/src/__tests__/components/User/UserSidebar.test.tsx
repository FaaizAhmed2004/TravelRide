import { render, screen, fireEvent } from '@testing-library/react';
import { UserSidebar } from '@/component/User/User-sidebar/user-sidebar';
import { AuthProvider } from '@/contexts/AuthContext';
import '@testing-library/jest-dom';

// Mock the next/navigation hooks
const mockUsePathname = jest.fn().mockReturnValue('/user/dashboard');
const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('UserSidebar Component', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'USER' as const,
  };

  // Mock logout function
  const mockLogout = jest.fn();
  
  // Mock useAuth hook
  jest.mock('@/contexts/AuthContext', () => ({
    ...jest.requireActual('@/contexts/AuthContext'),
    useAuth: () => ({
      logout: mockLogout,
    }),
  }));

  const renderWithAuth = (ui: React.ReactElement) => {
    return render(<AuthProvider>{ui}</AuthProvider>);
  };

  test('renders without user data', () => {
    renderWithAuth(<UserSidebar />);
    
    // Check if the sidebar header is rendered
    expect(screen.getByText('TravelNRide')).toBeInTheDocument();
    expect(screen.getByText('Your Travel Companion')).toBeInTheDocument();
    
    // User profile section should not be visible
    expect(screen.queryByText(/john.doe@example.com/i)).not.toBeInTheDocument();
  });

  test('renders with user data', () => {
    renderWithAuth(<UserSidebar user={mockUser} />);
    
    // Check if user information is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('USER')).toBeInTheDocument();
  });

  test('renders with user avatar', () => {
    const userWithAvatar = {
      ...mockUser,
      avatar: 'https://example.com/avatar.jpg',
    };
    
    renderWithAuth(<UserSidebar user={userWithAvatar} />);
    
    // Check if avatar is rendered
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  test('renders navigation menu items', () => {
    renderWithAuth(<UserSidebar user={mockUser} />);
    
    // Check if menu items are rendered
    expect(screen.getByText('My Dashboard')).toBeInTheDocument();
    expect(screen.getByText('My Bookings')).toBeInTheDocument();
    expect(screen.getByText('My Trips')).toBeInTheDocument();
    expect(screen.getByText('Wishlist')).toBeInTheDocument();
    expect(screen.getByText('Payment Methods')).toBeInTheDocument();
    expect(screen.getByText('My Reviews')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Profile Settings')).toBeInTheDocument();
    expect(screen.getByText('Help & Support')).toBeInTheDocument();
  });

  test('renders quick actions', () => {
    renderWithAuth(<UserSidebar user={mockUser} />);
    
    // Check if quick actions are rendered
    expect(screen.getByText('Browse Packages')).toBeInTheDocument();
    expect(screen.getByText('Our Services')).toBeInTheDocument();
  });

  test('renders sign out button', () => {
    renderWithAuth(<UserSidebar user={mockUser} />);
    
    // Check if sign out button is rendered
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });
  
  test('handles different user roles', () => {
    const adminUser = {
      ...mockUser,
      role: 'ADMIN' as const,
    };
    
    renderWithAuth(<UserSidebar user={adminUser} />);
    
    // Check if admin role is displayed
    expect(screen.getByText('ADMIN')).toBeInTheDocument();
  });
  
  test('handles active menu item highlighting', () => {
    // Change the mocked pathname to match a specific menu item
    mockUsePathname.mockReturnValueOnce('/user/trips');
    
    renderWithAuth(<UserSidebar user={mockUser} />);
    
    // The My Trips link should have the active class
    const tripsLink = screen.getByText('My Trips').closest('a');
    expect(tripsLink?.parentElement).toHaveClass('bg-[#8dd3bb]/30');
  });
  
  test('handles missing user name gracefully', () => {
    const userWithoutName = {
      ...mockUser,
      name: '',
    };
    
    renderWithAuth(<UserSidebar user={userWithoutName} />);
    
    // Should display first letter as empty or handle it gracefully
    expect(screen.queryByText('J')).not.toBeInTheDocument();
  });
});