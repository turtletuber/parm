import uuidv1 from 'uuid/v1';

const key = 'f5-user-id';
/**
 * track the user.
 * let's me ensure users can't reply to themselves.
 */
const userId = (): string => {
  const id = localStorage.getItem(key);
  if (!id) {
    const uuid = uuidv1();
    localStorage.setItem(key,uuid);
    return uuid;
  }
  return id;
}

/**
 * super simple local storage.
 */
export const storage = {
  /** unique id for this user and this browser */
  userId,
}