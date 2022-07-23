export interface Address{
  Id: number;
  Name: string;
  Districts: [
    {
      Id: number;
      Name: string;
      Wards: [
        {
          Id: number;
          Name: string;
          Level: string;
        }]
    }];
}
