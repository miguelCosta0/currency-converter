import { useAppSelector } from '@/lib/hooks';
import cleanInputNumber from '@/utils/cleanInputNumber';

export default function Title() {
  const { currencies: allCurrencies } = useAppSelector(
    (state) => state.allCurrencies
  );
  const { currency1, currency2 } = useAppSelector((state) => state.currencies);
  const [code1, code2, amount1] = [
    currency1.code,
    currency2.code,
    currency1.amount,
  ];

  const formatedTitle =
    allCurrencies && code1 && code2 && amount1
      ? `${cleanInputNumber(amount1)} ${allCurrencies[code1].name} to ${
          allCurrencies[code2].name
        }`
      : 'Currency Converter';

  return (
    <h1 className="max-w-full overflow-x-hidden font-bold my-3 text-center text-3xl">
      {formatedTitle}
    </h1>
  );
}
