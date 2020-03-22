interface IQuote {
  quote: string;
  name: string;
  time: string;
  id: number;
}

interface IAccount {
  name: string;
  card_id: number;
  vulgo: string;
  statistic: number;
  balance: number;
  today: number;
  // swisspass
  email: string;
  hash: string;
  collection: [];
  token: string;
}
