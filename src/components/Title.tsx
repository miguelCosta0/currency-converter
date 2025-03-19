import { useAppSelector } from '@/lib/hooks';
import cleanInputNumber from '@/utils/cleanInputNumber';

export default function Title() {
  const currencies = useAppSelector((state) => state.currencies.obj);
  const { currency1, currency2 } = useAppSelector(
    (state) => state.currencyCodes
  );
  const amountOfCurrency1 = useAppSelector(
    (state) => state.amountOfCurrency.amount1
  );

  const formatedTitle =
    currencies && currency1 && currency2 && amountOfCurrency1
      ? `${cleanInputNumber(amountOfCurrency1)} ${
          currencies[currency1].name
        } to ${currencies[currency2].name}`
      : 'Currency Converter';

  return (
    <h1 className="max-w-full overflow-x-hidden font-bold my-3 text-center text-3xl">
      {formatedTitle}
    </h1>
  );
}
