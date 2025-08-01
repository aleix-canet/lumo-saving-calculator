import axios, { AxiosError } from 'axios';
import type { Permutations } from '../types/Permutations';
import { mockedPermutations } from './mock';

export const getPermutationsData = async (): Promise<Permutations> => {
  const response = await axios
    // TODO: use real endpoint when available
    .get(`https://jsonplaceholder.typicode.com/posts/`)
    .catch(error => {
      if (error instanceof AxiosError) {
        throw new Error(error.message);
      }
      throw error;
    });
  return mockedPermutations;
  return response.data;
};
