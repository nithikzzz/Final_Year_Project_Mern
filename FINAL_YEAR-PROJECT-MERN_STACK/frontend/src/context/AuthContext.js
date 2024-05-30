import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios';
export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])
  const handleLogin = async (email) => {
    try {
      const response = await axios.post('/log/login', { email });
      console.log("entered");
      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN', payload: user });
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error
    }
  };
  const handleLogout = async () => {
    try {
      await axios.post('/log/logout');
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      // Handle logout error
    }
  };

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch ,handleLogin,handleLogout}}>
      { children }
    </AuthContext.Provider>
  )

}