import sessionStorage from 'redux-persist/lib/storage/session';


export const createConfig = (key, whitelist) =>
(
  {
    key: key,
    storage: sessionStorage,
    version: 1,
    whitelist: whitelist
    }
);