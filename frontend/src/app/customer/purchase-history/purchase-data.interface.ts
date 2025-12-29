export interface purchaseHistory{
    slno:number,
    date:string,
    warrantyavailed:'Yes'|'No',
    warrantyServices: string[],
    Repairs:'Yes'|'No',
    routineMaintanance:'Yes'|'No',
    amountPaid:number
}