import { COLLECTION_CREATE_MSG, SERVER_ERROR } from '../../constants/toast';
import type { IAPIError } from '../../types/error';
import { ICreateCollectionPayload } from '../../types/formik';
import { BaseQuery } from '../../types/rtkApi';
import { toastHandler } from '../../utils/toastHandlers';
import { RootState } from '../store';

export const collectionQuery: BaseQuery<ICreateCollectionPayload, void> = async (
  arg,
  { dispatch, queryFulfilled, getState }
) => {
  const {
    user: { language },
  } = getState() as RootState;

  try {
    await queryFulfilled;

    toastHandler(dispatch, COLLECTION_CREATE_MSG[language], 'success');
  } catch (e) {
    const {
      error: {
        data: { msg },
      },
    } = e as IAPIError;

    if (msg) {
      toastHandler(dispatch, msg, 'error');
    } else {
      toastHandler(dispatch, SERVER_ERROR[language], 'error');
    }
  }
};
