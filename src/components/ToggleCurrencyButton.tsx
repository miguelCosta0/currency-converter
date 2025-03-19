import { TbArrowsExchange } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toggleFlagSrcs } from '@/lib/features/flagSrcs/flagSrcsSlice';
import { toggleCurrencyCodes } from '@/lib/features/currencyCodes/currencyCodesSlice';
import { setExchange } from '@/lib/features/exchange/exchangeSlice';
import { setAmountOfCurrency } from '@/lib/features/amountOfCurrency/amountOfCurrencySlice';

export default function ToggleContainer() {
  const dispatch = useAppDispatch();
  const exchange = useAppSelector((state) => state.exchange.exchange);
  const amountOfCurrency1 = useAppSelector(
    (state) => state.amountOfCurrency.amount1
  );

  return (
    <button
      className="p-0.5 hover:bg-main/25 rounded-lg transition-colors delay-50 duration-150"
      onClick={() => {
        toggleCurrencies();
        toggleFlags();
        updateInputs();
      }}
    >
      <TbArrowsExchange size={25} />
    </button>
  );

  function toggleFlags() {
    dispatch(toggleFlagSrcs());
  }

  function toggleCurrencies() {
    dispatch(toggleCurrencyCodes());
  }

  function updateInputs() {
    if (exchange) {
      const newExchange = exchange ** -1;
      dispatch(setExchange({ newExchange }));
      dispatch(
        setAmountOfCurrency({
          idNumber: 1,
          newAmount: amountOfCurrency1,
          exchange: newExchange,
        })
      );
    }
  }
}
