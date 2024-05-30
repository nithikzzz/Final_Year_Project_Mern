import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (name, email,authority, password,cpassword, phno) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, email, authority, password, cpassword, phno }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));

        // update the auth context
        dispatch({ type: 'LOGIN', payload: json });
      }
    } catch (error) {
      console.error('Network or unexpected error:', error);
      setError('An error occurred while processing your request.');
    } finally {
      // update loading state
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
