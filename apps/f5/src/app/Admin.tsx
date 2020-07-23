import React from 'react';
import { useRoles } from './firebase';

export const Admin = () => {
  const roles = useRoles();

  if (!roles.includes('admin'))
    return (
      <span>
        Sorry, you don't have permission to view this.
      </span>
    );

  return <span>Hello World!</span>
}