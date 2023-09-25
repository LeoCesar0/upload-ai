type ZustandSet<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>)
) => void;
