import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../utils/AuthContext';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation();
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
      if (!isAuthenticated) {
        navigation.navigate('LoginScreen');
      }
    }, [isAuthenticated, navigation]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;