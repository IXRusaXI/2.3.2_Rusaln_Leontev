import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Item } from '../../store'

export interface ApiError {
  message: string
}

export const fetchProducts = createAsyncThunk<
  Item[],
  void,
  { rejectValue: ApiError }
>(
  'users/fetchById',
  async (_, thunkApi) => {
    try {
      const response = await fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')

      if (!response.ok) {
        return thunkApi.rejectWithValue({ message: 'Failed to load items' })
      }

      const data: Item[] = await response.json()
      return data
    } catch {
      return thunkApi.rejectWithValue({ message: 'Network error' })
    }
  }
)