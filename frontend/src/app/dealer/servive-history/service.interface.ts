export interface service{
    customerName:string,
    customerId:string,
    vehicleId:string,
    serviceHistory:{
        slno:number,
        date:string,
        warrantyavailed:'Yes'|'No',
        warrantyServices: string[],
        Repairs:'Yes'|'No',
        routineMaintanance:'Yes'|'No',
        amountPaid:number
    }[];
}

export interface serviceHistory{
    slno:number,
    date:string,
    warrantyavailed:'Yes'|'No',
    warrantyServices: string[],
    Repairs:'Yes'|'No',
    routineMaintanance:'Yes'|'No',
    amountPaid:number
}