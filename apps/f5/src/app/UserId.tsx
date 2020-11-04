import React from 'react';
import { storage } from './storage';

export default function UserId() {
  const userId = storage.userId();
  return (
    <span>
      {userId}
    </span>
  );
}