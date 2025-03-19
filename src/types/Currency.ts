export type Currency = {
  code: string;
  name: string;
  country: string;
  countryCode: string;
};

export type Data_Url_Image = string;

export type CurrencyWithFlags = Currency & { flag: Data_Url_Image };
