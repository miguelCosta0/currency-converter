import SelectCurrency from './SelectCurrency';
import AmountOfCurrencyInput from './AmountOfCurrencyInput';

type CurrencyContainerProps = {
  idNumber: number;
};

export default function CurrencyContainer({
  idNumber,
}: CurrencyContainerProps) {
  return (
    <div className="max-w-90 md:max-w-[40%]">
      <SelectCurrency idNumber={idNumber} />

      <AmountOfCurrencyInput idNumber={idNumber} />
    </div>
  );
}
