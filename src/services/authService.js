const AUTH_KEY = 'cosmatic_admin_auth';

export const authService = {
  login(username, password) {
    if (username === 'admin' && password === 'password123') {
      const user = { username: 'admin', role: 'Admin', token: 'mock-jwt-admin-token-12345' };
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials. Use admin / password123' };
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  getCurrentUser() {
    const data = localStorage.getItem(AUTH_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  },

  isAuthenticated() {
    return !!this.getCurrentUser();
  }
};
