import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
    role: null,
    login: (userData) => set({ 
        isAuthenticated: true, 
        user: userData.user, 
        role: userData.user.role 
    }),
    logout: () => {
        localStorage.removeItem('token');
        set({ isAuthenticated: false, user: null, role: null });
    },
}));
export default useAuthStore;