export default function cleanInputNumber(input: string): string {
  const aux = input.split('.');
  while (aux[1] && aux[1].at(-1) === '0') {
    aux[1] = aux[1].slice(0, aux[1].length - 1);
  }

  return aux[1] ? aux.join('.') : aux[0];
}
