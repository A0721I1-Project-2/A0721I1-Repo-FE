export interface Districts{
  Id: number;
  Name: string;
  Wards: [
    {
      Id: number;
      Name: string;
      Level: string;
    }];
}
