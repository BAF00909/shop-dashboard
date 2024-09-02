export interface IProduct {
	Id: number;
	Art: number;
  	ProductName: string;
  	DateIn: Date;
  	Count: number;
 	Cost: number;
  	ProductGroupId: number;
  	SupplyId: number;
	ProductGroups: { GroupName: string };
	Supplies: { Date: string, Providers: { ProviderName: string } }
}