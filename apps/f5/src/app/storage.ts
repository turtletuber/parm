import uuidv1 from 'uuid/v1';

/**
 * track the user.
 * let's me ensure users can't reply to themselves.
 */
const userId = (): string => {
  const key = 'f5-user-id';
  const id = localStorage.getItem(key);
  if (!id) {
    const uuid = uuidv1();
    localStorage.setItem(key,uuid);
    return uuid;
  }
  return id;
}

/**
 * track theme
 */
const isDark = (): boolean => {
  const key = 'f5-is-dark';
  const value = localStorage.getItem(key);
  if (!value) {
    const initial = 'false';
    localStorage.setItem(key, initial);
  }
  return value === 'true';
}

const setIsDark = (value: boolean) => {
  const key = 'f5-is-dark';
  localStorage.setItem(key, String(value));
}

/**
 * super simple local storage.
 */
export const storage = {
  /** unique id for this user and this browser */
  userId,
  /** theme */
  isDark, setIsDark,
}