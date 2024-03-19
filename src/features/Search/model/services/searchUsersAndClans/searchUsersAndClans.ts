import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { searchActions } from '../../slice/searchSlice';
import { FoundData } from '../../types/FoundData';

interface ThunkProps {
  string: string,
  limit?: number,
  type?: 'account' | 'clans',
}

export const searchUsersAndClans = createAsyncThunk<FoundData, ThunkProps, ThunkConfig<string>>(
  'SEARCH_USERS_AND_CLANS',
  async (ThunkProps, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, dispatch, extra } = thunkAPI;
    const {
      string = '', limit = 5,
    } = ThunkProps;
    const serverError = 'Проблема соединения. Попробуйте позже.';
    // отправка запроса
    try {
      const response = await extra.royalApi.get<FoundData>(`/search/?string=${string}&limit=${limit}`);

      if (!response.data) rejectWithValue(serverError);

      if (response.data.players.length > 0) {
        dispatch(searchActions.setFoundPlayers(response.data.players));
      }

      if (response.data.clans.length > 0) {
        dispatch(searchActions.setFoundClans(response.data.clans));
      }

      // возвращаем полученные данные
      return response.data;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || serverError);
    }
  },
);