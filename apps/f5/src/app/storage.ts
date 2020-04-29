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
 * get or set pref
 */
const themePref = (_pref?: string) => {
  const key = 'f5-theme';
  if (_pref) {
    localStorage.setItem(key, _pref);
    return _pref;
  }
  return localStorage.getItem(key);
}

/**
 * super simple local storage.
 */
export const storage = {
  /** unique id for this user and this browser */
  userId,
  /** theme preference for this user */
  themePref,
}