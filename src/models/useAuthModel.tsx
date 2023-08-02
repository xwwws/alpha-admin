// @ts-ignore
import { useCallback, useState } from 'react';

export default function useAuthModel() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const signin = useCallback((account: any, password: any) => {
    // signin implementation
    // setUser(user from signin API)
  }, []);

  const signout = useCallback(() => {
    // signout implementation
    // setUser(null)
  }, []);

  return {
    user,
    signin,
    signout,
  };
}
