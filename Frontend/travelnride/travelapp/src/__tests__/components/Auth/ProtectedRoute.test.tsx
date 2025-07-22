import { render, screen } from '@testing-library/react';
import { ProtectedRoute } from '@/component/Auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import '@testing-library/jest-dom';

// Mock the useAuth hook
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock the next/navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/user/dashboard',
}));

describe('ProtectedRoute Component', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockImplementation(() => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    }));
    
    // Mock router
    jest.spyOn(require('next/navigation'), 'useRouter').mockImplementation(() => ({
      push: mockPush,
    }));
  });

  test('shows loading state when isLoading is true', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,
    }));

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    // Should show loading spinner
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  test('redirects to login when user is not authenticated', () => {
    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    // Should not render children
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    
    // Should redirect to login
    expect(mockPush).toHaveBeenCalledWith('/Login');
    
    // Should store the current path for redirect after login
    expect(sessionStorage.setItem).toHaveBeenCalledWith('redirectAfterLogin', '/user/dashboard');
  });

  test('renders children when user is authenticated', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      user: { id: '1', name: 'Test User', email: 'test@example.com', role: 'USER' as const },
      isLoading: false,
      isAuthenticated: true,
    }));

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    // Should render children
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    
    // Should not redirect
    expect(mockPush).not.toHaveBeenCalled();
  });

  test('redirects to appropriate dashboard when role does not match', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      user: { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'ADMIN' as const },
      isLoading: false,
      isAuthenticated: true,
    }));

    render(
      <ProtectedRoute requiredRole="USER">
        <div>User Content</div>
      </ProtectedRoute>
    );

    // Should not render children
    expect(screen.queryByText('User Content')).not.toBeInTheDocument();
    
    // Should redirect to admin dashboard
    expect(mockPush).toHaveBeenCalledWith('/Dashboard');
  });

  test('renders children when role matches required role', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      user: { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'ADMIN' as const },
      isLoading: false,
      isAuthenticated: true,
    }));

    render(
      <ProtectedRoute requiredRole="ADMIN">
        <div>Admin Content</div>
      </ProtectedRoute>
    );

    // Should render children
    expect(screen.getByText('Admin Content')).toBeInTheDocument();
    
    // Should not redirect
    expect(mockPush).not.toHaveBeenCalled();
  });
});