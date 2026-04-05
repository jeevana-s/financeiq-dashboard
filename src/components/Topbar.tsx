import { Search, Moon, Sun, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Topbar = () => {
  const { theme, toggleTheme, userRole, setUserRole, searchQuery, setSearchQuery } = useApp();

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 transition-colors">
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setUserRole('admin')}
            className={`
              px-3 py-1.5 rounded-md text-sm font-medium transition-all
              ${
                userRole === 'admin'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }
            `}
          >
            Admin
          </button>
          <button
            onClick={() => setUserRole('viewer')}
            className={`
              px-3 py-1.5 rounded-md text-sm font-medium transition-all
              ${
                userRole === 'viewer'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }
            `}
          >
            Viewer
          </button>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-slate-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600" />
          )}
        </button>

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />

        <button className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {userRole === 'admin' ? 'Admin User' : 'Guest Viewer'}
          </span>
        </button>
      </div>
    </header>
  );
};
