export function constructQuery(
  searchParams: URLSearchParams,
  name: string,
  value: string,
) {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return params.toString();
}
