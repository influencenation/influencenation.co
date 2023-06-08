import { User } from '../types/user/user.types';

const accessTokenKey = 'access_tkn';
const refreshTokenKey = 'refresh_tkn';

const authHelper = {
  getAccessToken: (): string | null => {
    return window.localStorage.getItem(accessTokenKey);
  },
  getRefreshToken: (): string | null => {
    return window.localStorage.getItem(refreshTokenKey);
  },
  setTokens: ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
    window.localStorage.setItem(accessTokenKey, accessToken);
    window.localStorage.setItem(refreshTokenKey, refreshToken);
  },
  decrypt: (token: string): User | null => {
    if (!token) {
      return null;
    }

    const base64Url = token.split('.')?.[1];
    const base64 = base64Url?.replace(/-/g, '+')?.replace(/_/g, '/');
    if (!base64) {
      return null;
    }

    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    try {
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  },
};

export default authHelper;
