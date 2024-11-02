export type FetchedCurrency = {
  name: string;
  price: number;
  slug: string;
  cmc_id: number;
  cmc_rank: number | null;
};

export type Transaction = {
  amount: string;
  purchasePrice: string;
  date: string;
  id: string;
};

export type Totals = {
  totalAmount: number;
  totalPurchasePrice: number;
  totalAveragePurchasePrice: number;
};

export type SelectedAsset = {
  name: string;
  slug: string;
  cmc_id: number;
  index: number;
  totals: Totals;
  transactions: Transaction[];
};
