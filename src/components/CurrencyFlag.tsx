import Image from 'next/image';
import { useAppSelector } from '@/lib/hooks';
import { CurrenciesState } from '@/lib/features/currencies/types';

type CurrencyFlagProps = {
  idNumber: number;
};

export default function CurrencyFlag({ idNumber }: CurrencyFlagProps) {
  const flagSize = 30;
  const flagSrc = useAppSelector(
    (state) =>
      state.currencies[`currency${idNumber}` as keyof CurrenciesState].flagSrc
  );

  return (
    <Image
      id={`currency-flag-${idNumber}`}
      alt="flag"
      src={flagSrc}
      width={flagSize}
      height={flagSize}
    />
  );
}
