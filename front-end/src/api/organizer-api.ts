import axiosClient from '~/api/axios-client';
import { IOrganizer } from '~/types';

export const OrganizerApi = {
  async createOrganizer(value: IOrganizer, id: string) {
    try {
      const { data } = await axiosClient.post(`/competitions/info-organizer/${id}`, value);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  async getOrganizer(id: string) {
    try {
      const { data } = await axiosClient.get(`/competitions/get-info-organizer/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};
