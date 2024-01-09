import { useAuthContext } from './useAuthContext';
import {useTasksContext} from './useTasksContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const { setTasks } = useTasksContext();

  const logout = () => {
    localStorage.removeItem('user');

    dispatch({ type: 'LOGOUT' });

    setTasks([]);
  };

  return { logout };
};
