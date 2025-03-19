import Image from 'next/image';
import { useAppSelector } from '@/lib/hooks';
import { FlagSrcsState } from '@/lib/features/flagSrcs/flagSrcsSlice';

type CurrencyFlagProps = {
  idNumber: number;
};

export default function CurrencyFlag({ idNumber }: CurrencyFlagProps) {
  const flagSize = 30;
  const flagSrc = useAppSelector(
    (state) => state.flagSrcs[`src${idNumber}` as keyof FlagSrcsState]
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
