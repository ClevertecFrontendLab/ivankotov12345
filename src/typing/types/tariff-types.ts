export type TariffType = {
  tariffId: string,
  expired: string
}

export type PeriodsType = {
  text: string,
  cost: number,
  days: number,
}

export type TariffListType = {
  _id: string,
  name: string,
  periods: PeriodsType[],
}