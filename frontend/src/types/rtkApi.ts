import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import type { MutationLifecycleApi } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

export type BaseQuery<T, R> = (
  arg: T,
  api: MutationLifecycleApi<
    T,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      Record<string, never>,
      FetchBaseQueryMeta
    >,
    R,
    'api'
  >
) => void | Promise<void>;
