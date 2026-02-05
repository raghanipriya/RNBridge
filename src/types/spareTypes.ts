import {z} from 'zod';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface FrappeResponse<T> {
  message: ApiResponse<T>;
}

export interface ProductCoreDetails {
  name: string;
  product: string;
  serial_no: string;
  product_name: string;
  defect?: string | null;
  solution?: string | null;
  division?: string | null;
  creation: string;
  modified: string;
  owner: string;
  modified_by: string;
}

export interface SpareReplacementItem {
  name: string;
  main_serial_no: string;
  spare_item: string;
  product_name: string;
  old_spare_part_name: string;
  new_spare_part_name: string;
}

export interface ServiceChargeItem {
  name: string;
  item: string;
  item_name: string;
}

export interface SymptomQuestion {
  name: string;
  core_row_id: string;
  symptom: string;
  question: string;
}
export interface ProductCoreDetailPayload {
  product_core_details: ProductCoreDetails;
  spare_replacement: SpareReplacementItem[];
  consumption_items: any[];
  service_charges: ServiceChargeItem[];
  symptom_questions: SymptomQuestion[];
  spare_replacement_delete: boolean;
  consumption_delete: boolean;
  service_charges_delete: boolean;
}

export type GetProductCoreDetailResponse =
  FrappeResponse<ProductCoreDetailPayload>;

export type addSpareResponseItem = {
  name: string;
  amount: number;
  status: string;
  idx: number;
};

export interface FieldValidation {
  read_only: boolean;
  required: boolean;
}

export interface SpareChildItem {
  name: string;
  creation: string;
  modified: string;
  modified_by: string;
  owner: string;
  docstatus: number;
  idx: number;
  item_name: string;
  parent: string;
  parentfield: string;
  parenttype: string;
  main_serial_no: string;
  under_amc: string;
  amc_type: string;
  under_warranty: string;
  warehouse: string;
  spare_part_name: string | null;
  old_spare_part_serial_no: string;
  is_old_spare_received: number;
  new_spare_part_serial_no: string;
  spare_part_charge: number;
  is_billable: number;
  is_foc: number;
  is_stand_by: number;
  rate: number;
  disc: number;
  amount: number;
  remark: string;
  standby_provided_by: string;
  spare_item: string;
  old_spare_part_name: string;
  new_spare_part_name: string;
  material_receipt: number;
  material_issue: number;
  item_type: string;
  spare_item_name: string | null;
  old_batch_no: string | null;
  old_qty_removed: number;
  new_batch_no: string | null;
  new_qty_issued: number;
  void_warranty_dialog_values: unknown | null;
  warranty_voided: number;
  new_spare_item: string;
  available_quantity: number;
  product_of_new_spare_installation: string;
  serial_no_of_new_spare_installation: string;
  dead_on_arrival: number;
  product_of_new_spare_installation_name: string | null;
  field_validations: Record<string, FieldValidation>;
}

export interface DeleteSpareResponse {
  row_id: string;
  service_call: string;
}

export interface CountryResp {
  name: string;
}

export const SpareReplacementItemSchema = z
  .object({
    name: z.string(),
    main_serial_no: z.string(),
    spare_item: z.string(),
    product_name: z.string(),
    old_spare_part_name: z.string(),
    new_spare_part_name: z.string(),
  })
  .strict();

export const ProductCoreDetailSchema = z.object({
  spare_replacement: z.array(SpareReplacementItemSchema),
  // add other fields from ProductCoreDetailPayload if needed
});

export type SpareReplacementItems = z.infer<typeof SpareReplacementItemSchema>;
