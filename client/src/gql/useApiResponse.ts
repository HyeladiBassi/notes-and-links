import { useEffect, useState, useMemo } from 'react';
import {
  useMutation,
  DocumentNode,
  MutationResult,
  QueryResult,
  useLazyQuery,
} from '@apollo/client';

export const getApiResponse = async (
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: MutationResult<any> | QueryResult<any>
) => {
  if (!state.called) return;

  if (state?.error) throw state.error;

  if (state?.data && !state?.error && !state?.loading) {
    const data = state?.data[endpoint];
    if (data) {
      if (!data.status) return data;
      if (data.status >= 200 && data.status < 300) return data;
      if (data.status >= 400 && data.status < 500) throw data;
      throw new Error(`${endpoint}, ${JSON.stringify(data)}`);
    }
    throw new Error(`Data was not returned for ${endpoint}`);
  }

  return;
};

export function useMutationResponse<T, E extends string>(
  endpoint: E,
  mutation: DocumentNode
) {
  const [call, state] = useMutation(mutation);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);

  const handleApiResponse = () => {
    getApiResponse(endpoint, state)
      .then((data) => {
        if (data) {
          setData(data);
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  const reset = () => {
    setData(null);
    setError(null);
    state.reset();
  };

  useEffect(() => {
    handleApiResponse();
  }, [state]);

  return useMemo(
    () => ({
      [endpoint]: Object.assign(call),
      state: { loading: state.loading, data, error, reset },
    }),
    [call, state]
  );
}

export const useQueryResponse = (endpoint: string, query: DocumentNode) => {
  const [call, state] = useLazyQuery(query);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleApiResponse = () => {
    getApiResponse(endpoint, state)
      .then((data) => {
        if (data) {
          setData(data);
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    handleApiResponse();
  }, [state]);

  return useMemo(
    () => ({ [endpoint]: call, state: { ...state, data, error } }),
    [call, state]
  );
};
