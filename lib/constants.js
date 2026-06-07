export const STAGES = [
  "Indent",
  "PO Check",
  "GRN / Inward",
  "Location Assignment",
  "Finalize Goods",
  "Storage Confirmation",
  "Invoice",
  "Receipt",
];

export const STAGE_COLORS = {
  "Indent":               "#06b6d4",
  "PO Check":             "#f59e0b",
  "GRN / Inward":         "#8b5cf6",
  "Location Assignment":  "#ec4899",
  "Finalize Goods":       "#f97316",
  "Storage Confirmation": "#10b981",
  "Invoice":              "#3b82f6",
  "Receipt":              "#22c55e",
};

export const STAGE_LABELS = {
  "Indent":               "Indent",
  "PO Check":             "PO Check",
  "GRN / Inward":         "GRN",
  "Location Assignment":  "Location",
  "Finalize Goods":       "Finalize",
  "Storage Confirmation": "Storage",
  "Invoice":              "Invoice",
  "Receipt":              "Receipt",
};

export const DEPARTMENTS = [
  "Production","Maintenance","Admin","Logistics","Warehouse","Finance",
];

export const UNITS = ["Nos","Kg","Ltrs","Box","Pcs","MT"];

export const VALIDATIONS = {
  "PO Check":             "V1 - PO must exist, be open, and have sufficient remaining quantity",
  "GRN / Inward":         "V2 - Received qty must match PO qty within tolerance. Quality check required.",
  "Storage Confirmation": "V3 - Only authorized roles may confirm storage. Access logged.",
  "Invoice":              "V4 - 3-Way Match: PO qty = GRN qty = Invoice qty. GST HSN validated.",
  "Receipt":              "V5 - Duplicate invoice check. Approval workflow compliance verified.",
};
