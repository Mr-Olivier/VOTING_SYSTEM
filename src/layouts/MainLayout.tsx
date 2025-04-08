import { Outlet } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { LogOut, User } from 'lucide-react';
// import { logout } from '@/features/auth/authSlice';
import type { RootState } from '@/store';

const MainLayout = () => {
  // const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">UR-Electify</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User size={20} />
                <span>{user?.first_name} {user?.last_name}</span> 
              </div>
              <button
                // onClick={() => dispatch(logout())}
                className="flex items-center gap-2 text-red-600"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;