import { Data_Url_Image } from '@/types/Currency';
import { PayloadAction } from '@reduxjs/toolkit';

export interface Currency {
  code: string;
  amount: string;
  flagSrc: Data_Url_Image;
}

export interface CurrenciesState {
  currency1: Currency;
  currency2: Currency;
}

export type SetCurrencyCodePayload = PayloadAction<{
  idNumber: number;
  newCode: string;
}>;

export type SetAmountOfCurrencyPayload = PayloadAction<{
  idNumber: number;
  newAmount: string;
  exchange: number;
}>;

export type SetFlagSrcPayload = PayloadAction<{
  idNumber: number;
  newSrc: Data_Url_Image;
}>;
