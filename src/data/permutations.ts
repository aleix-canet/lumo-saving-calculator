import axios, { AxiosError } from 'axios';
import type { SavingsPermutations } from '../types/Permutations';
import { mockedFinancePermutations, mockedSavingsPermutations } from './mock';

export const getSavingsPermutationsData =
  async (): Promise<SavingsPermutations> => {
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

export const getFinancePermutationsData = async (): Promise<
  typeof mockedFinancePermutations
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
  return mockedFinancePermutations;
  return response.data;
};
