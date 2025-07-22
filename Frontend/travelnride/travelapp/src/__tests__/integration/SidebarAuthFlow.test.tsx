import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LayoutProvider } from '@/component/Layout/LayoutProvider';
import '@testing-library/jest-dom';
import test from 'node:test';
import test from 'node:test';
import test from 'node:test';
import test from 'node:test';
import test from 'node:test';
import test from 'node:test';
import { beforeEach } from 'node:test';
import { describe } from 'node:test';

// Mock the next/navigation hooks
const mockPathname = jest.fn().mockReturnValue('/');
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt || ''} />;
  },
}));

// Mock components that might cause issues in tests
jest.mock('@/component/Header/Header', () => ({
  Header: () => <div data-testid="mock-header">Header</div>,
}));

jest.mock('@/component/Footer/Footer', () => ({
  Footer: () => <div data-testid="mock-footer">Footer</div>,
}));

jest.mock('@/component/User/User-sidebar/user-sidebar', () => ({
  UserSidebar: ({ user }: { user?: { name: string; email: string } }) => (
    <div data-testid="user-sidebar">
      {user && (
        <>
          <div data-testid="sidebar-user-name">{user.name}</div>
          <div data-testid="sidebar-user-email">{user.email}</div>
        </>
      )}
    </div>
  ),
}));

jest.mock('@/component/Public/Public-sidebar/public-sidebar', () => ({
  PublicSidebar: () => (
    <div data-testid="public-sidebar">Public Sidebar</div>
  ),
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

// Create a test component that uses the auth context and layout provider
const TestApp = () => {
  return (
    <AuthProvider>
      <LayoutProvider>
        <div data-testid="page-content">Page Content</div>
      </LayoutProvider>
    </AuthProvider>
  );
};

describe('Sidebar Authentication Flow Integration', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockLocalStorage.clear();
    mockSessionStorage.clear();
    mockPathname.mockReturnValue('/');
  });

  test('shows public sidebar for unauthenticated users', async () => {
    render(<TestApp />);
    
    await waitFor(() => {
      expect(screen.getByTestId('public-sidebar')).toBeInTheDocument();
      expect(screen.queryByTestId('user-sidebar')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-header')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-footer')).not.toBeInTheDocument();
    });
  });

  test('shows sidebar layout for authenticated users on public pages', async () => {
    // Setup authenticated state
    mockLocalStorage.setItem('auth_token', 'mock_token');
    mockLocalStorage.setItem('user_role', 'USER');
    
    render(<TestApp />);
    
    await waitFor(() => {
      expect(screen.getByTestId('user-sidebar')).toBeInTheDocument();
      expect(screen.queryByTestId('mock-header')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-footer')).not.toBeInTheDocument();
    });
  });

  test('shows sidebar layout for authenticated users on about page', async () => {
    // Setup authenticated state and about page path
    mockLocalStorage.setItem('auth_token', 'mock_token');
    mockLocalStorage.setItem('user_role', 'USER');
    mockPathname.mockReturnValue('/about');
    
    render(<TestApp />);
    
    await waitFor(() => {
      expect(screen.getByTestId('user-sidebar')).toBeInTheDocument();
    });
  });

  test('shows sidebar layout for authenticated users on services page', async () => {
    // Setup authenticated state and services page path
    mockLocalStorage.setItem('auth_token', 'mock_token');
    mockLocalStorage.setItem('user_role', 'USER');
    mockPathname.mockReturnValue('/Services');
    
    render(<TestApp />);
    
    await waitFor(() => {
      expect(screen.getByTestId('user-sidebar')).toBeInTheDocument();
    });
  });

  test('shows public sidebar on auth pages even when authenticated', async () => {
    // Setup authenticated state and login page path
    mockLocalStorage.setItem('auth_token', 'mock_token');
    mockLocalStorage.setItem('user_role', 'USER');
    mockPathname.mockReturnValue('/Login');
    
    render(<TestApp />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('user-sidebar')).not.toBeInTheDocument();
      expect(screen.getByTestId('public-sidebar')).toBeInTheDocument();
    });
  });

  test('shows user information in sidebar when authenticated', async () => {
    // Setup authenticated state with user info
    mockLocalStorage.setItem('auth_token', 'mock_token');
    mockLocalStorage.setItem('user_role', 'USER');
    
    render(<TestApp />);
    
    await waitFor(() => {
      expect(screen.getByTestId('user-sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar-user-name')).toHaveTextContent('John Doe');
      expect(screen.getByTestId('sidebar-user-email')).toHaveTextContent('john.doe@example.com');
    });
  });
});