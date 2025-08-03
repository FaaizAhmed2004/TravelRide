import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LayoutProvider } from '@/component/Layout/LayoutProvider';
import { ProtectedRoute } from '@/component/Auth/ProtectedRoute';
import '@testing-library/jest-dom';

// Mock the next/navigation hooks
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => '/Login',
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

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock sessionStorage
const mockSessionStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
});

// Create a test component that uses the auth context
const TestComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <>
          <div data-testid="auth-status">Authenticated</div>
          <div data-testid="user-name">{user?.name}</div>
          <div data-testid="user-email">{user?.email}</div>
          <div data-testid="user-role">{user?.role}</div>
          <button onClick={() => logout()}>Logout</button>
        </>
      ) : (
        <>
          <div data-testid="auth-status">Not Authenticated</div>
          <button onClick={() => login('test@example.com', 'password')}>Login as User</button>
          <button onClick={() => login('admin@travelnride.com', 'password')}>Login as Admin</button>
        </>
      )}
    </div>
  );
};

// Create a protected test component
const ProtectedTestComponent = () => {
  return (
    <ProtectedRoute requiredRole="USER">
      <div data-testid="protected-content">Protected Content</div>
    </ProtectedRoute>
  );
};

describe('Authentication Flow Integration', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockLocalStorage.clear();
    mockSessionStorage.clear();
  });

  test('shows unauthenticated state by default', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    expect(screen.queryByTestId('user-name')).not.toBeInTheDocument();
  });

  test('login as regular user redirects to user dashboard', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    fireEvent.click(screen.getByText('Login as User'));
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/user/dashboard');
    });
    
    // Check localStorage was updated
    expect(mockLocalStorage.getItem('auth_token')).toBe('mock_user_token');
    expect(mockLocalStorage.getItem('user_role')).toBe('USER');
  });

  test('login as admin redirects to admin dashboard', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    fireEvent.click(screen.getByText('Login as Admin'));
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/Dashboard');
    });
    
    // Check localStorage was updated
    expect(mockLocalStorage.getItem('auth_token')).toBe('mock_admin_token');
    expect(mockLocalStorage.getItem('user_role')).toBe('ADMIN');
  });

  test('logout clears auth state and redirects to home', async () => {
    // Setup authenticated state
    mockLocalStorage.setItem('auth_token', 'mock_token');
    mockLocalStorage.setItem('user_role', 'USER');
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    // Wait for auth check to complete
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    });
    
    fireEvent.click(screen.getByText('Logout'));
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
    
    // Check localStorage was cleared
    expect(mockLocalStorage.getItem('auth_token')).toBeNull();
    expect(mockLocalStorage.getItem('user_role')).toBeNull();
  });

  test('protected route redirects unauthenticated users to login', async () => {
    render(
      <AuthProvider>
        <ProtectedTestComponent />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/Login');
    });
    
    // Check that the current path was stored for redirect after login
    expect(mockSessionStorage.getItem('redirectAfterLogin')).not.toBeNull();
  });

  test('protected route allows access to authenticated users with correct role', async () => {
    // Setup authenticated state with USER role
    mockLocalStorage.setItem('auth_token', 'mock_token');
    mockLocalStorage.setItem('user_role', 'USER');
    
    render(
      <AuthProvider>
        <ProtectedTestComponent />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });
  });

  test('protected route redirects users with incorrect role', async () => {
    // Setup authenticated state with ADMIN role
    mockLocalStorage.setItem('auth_token', 'mock_token');
    mockLocalStorage.setItem('user_role', 'ADMIN');
    
    render(
      <AuthProvider>
        <ProtectedTestComponent />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/Dashboard');
    });
  });
});