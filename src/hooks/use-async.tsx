import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

interface APIResponse<T> {
  data: T;
  status: number;
}

interface UseAsyncState<T> {
  loading: boolean;
  response: T | null;
  error: string | null;
}

interface Err {
  message?: string;
}

interface UseAsyncConfig {
  skip?: boolean;
}

interface UseAsync<T> extends UseAsyncState<T> {
  fetch: (args?: any) => Promise<APIResponse<T> | undefined>;
}

function useAsync<T>(apiFn: (args?: any) => Promise<APIResponse<T>>, config: UseAsyncConfig): UseAsync<T> {
  const [state, setState] = useState<UseAsyncState<T>>({
    loading: false,
    response: null,
    error: null,
  });

  const fetch = React.useCallback(
    async (args?: any) => {
      setState(prevState => ({ ...prevState, loading: true }));
      try {
        const apiResponse = await apiFn(args);
        setState(prevState => ({
          loading: false,
          response: apiResponse.data,
          error: null,
        }));
        return apiResponse;
      } catch (err) {
        const errorMessage = (err as AxiosError<{ message?: string }>).response?.data?.message || (err as Err)?.message || 'Something went wrong';
        setState(() => ({
          loading: false,
          response: null,
          error: errorMessage,
        }));
      }
    },
    [apiFn],
  );

  useEffect(() => {
    if (!config?.skip) {
      fetch();
    }
  }, [fetch]);

  return { ...state, fetch };
}

export default useAsync;
