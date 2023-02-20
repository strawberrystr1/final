import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import {
  ICreateCollectionForm,
  ICreateCollectionPayload,
  IUpdateCollectionPayload,
} from '../types/formik';

import storage from './firebase';

type MutationCallback =
  | {
      callback: MutationTrigger<
        MutationDefinition<
          IUpdateCollectionPayload,
          BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
          'Collection' | 'Item',
          void,
          'api'
        >
      >;
      type: 'update';
      id: number;
      image: string | null;
    }
  | {
      callback: MutationTrigger<
        MutationDefinition<
          ICreateCollectionPayload,
          BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
          'Collection' | 'Item',
          void,
          'api'
        >
      >;
      type: 'create';
    };

export const createOrUpdateCollection = (
  values: ICreateCollectionForm,
  mutation: MutationCallback
) => {
  const { callback, type } = mutation;
  if (values.image) {
    const storageRef = ref(storage, `/files/${values.image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, values.image);
    uploadTask.then(() => {
      const refer = ref(storage, `/files/${values.image?.name}`);
      getDownloadURL(refer).then(url => {
        if (type === 'update') {
          callback({ ...values, image: url, id: mutation.id });
        } else {
          callback({ ...values, image: url });
        }
      });
    });
  } else {
    if (type === 'update') {
      const { id, image } = mutation;
      callback({ ...values, image: image ? image : '', id: id });
    } else {
      callback({ ...values, image: '' });
    }
  }
};
