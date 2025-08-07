import axios, { AxiosError } from 'axios';
import type { SavingsCalculations } from '../types/Calculations';
import { mockedSavingsPermutations } from './mock';

export const getSavingsPermutationsData = async (): Promise<
  SavingsCalculations[]
> => {
  const response = await axios
    // TODO: use real endpoint when available
    .get(`https://jsonplaceholder.typicode.com/posts/`)
    .catch(error => {
      if (error instanceof AxiosError) {
        throw new Error(error.message);
      }
      throw error;
    });
  return mockedSavingsPermutations;
  return response.data;
};
