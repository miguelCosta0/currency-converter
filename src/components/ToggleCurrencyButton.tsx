import { TbArrowsExchange } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  setAmountOfCurrency,
  toggleCurrencies,
} from '@/lib/features/currencies/currenciesSlice';
import { setExchange } from '@/lib/features/exchange/exchangeSlice';

export default function ToggleContainer() {
  const dispatch = useAppDispatch();
  const { exchange } = useAppSelector((state) => state.exchange);
  const { currency1 } = useAppSelector((state) => state.currencies);

  return (
    <button
      className="p-0.5 hover:bg-main/25 rounded-lg transition-colors delay-50 duration-150"
      onClick={() => {
        dispatch(toggleCurrencies());
        updateInputs();
      }}
    >
      <TbArrowsExchange size={25} className="text-main-dark" />
    </button>
  );

  function updateInputs() {
    if (!exchange) return;

    const newExchange = exchange ** -1;
    dispatch(setExchange({ newExchange }));
    dispatch(
      setAmountOfCurrency({
        idNumber: 1,
        newAmount: currency1.amount,
        exchange: newExchange,
      })
    );
  }
}
