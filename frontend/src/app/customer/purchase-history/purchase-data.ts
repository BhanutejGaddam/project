import { purchaseHistory } from "./purchase-data.interface";

export const purchaseData:purchaseHistory[]=[
    {
        slno: 1,
        date: "2024-12-10",
        warrantyavailed: "Yes",
        warrantyServices: ["Engine Oil & Filter", "Software Update"],
        Repairs: "No",
        routineMaintanance: "Yes",
        amountPaid: 750
      },
      {
        slno: 2,
        date: "2025-02-14",
        warrantyavailed: "Yes",
        warrantyServices: ["Brake Inspection", "Wheel Alignment"],
        Repairs: "No",
        routineMaintanance: "Yes",
        amountPaid: 900
      },
      {
        slno: 3,
        date: "2025-05-18",
        warrantyavailed: "No",
        warrantyServices: [],
        Repairs: "Yes",
        routineMaintanance: "Yes",
        amountPaid: 3200
      },
      {
        slno: 4,
        date: "2025-08-21",
        warrantyavailed: "No",
        warrantyServices: [],
        Repairs: "No",
        routineMaintanance: "Yes",
        amountPaid: 1200
      },
      {
        slno: 5,
        date: "2025-11-25",
        warrantyavailed: "No",
        warrantyServices: [],
        Repairs: "Yes",
        routineMaintanance: "No",
        amountPaid: 4500
      }
];