export default function cleanInputNumber(input: string): string {
  let l = -1;
  let r = 0;
  const aux = input.split('.');

  while (aux[0].at(r) === '0') r++;
  aux[0] = aux[0].slice(r) || '0';

  if (!aux[1]) return aux[0];

  while (aux[1].at(l) === '0') l--;
  aux[1] = aux[1].slice(0, aux[1].length + l + 1);

  return aux[1] ? aux.join('.') : aux[0];
}
