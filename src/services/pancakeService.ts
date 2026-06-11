import { supabase } from "@/integrations/supabase/client";

export interface GeoEntry { id: string; name: string }

export interface OrderData {
  fullName: string;
  phone: string;
  streetAddress: string;
  provinceId: string;
  provinceName: string;
  districtId: string;
  districtName: string;
  communeId: string;
  communeName: string;
  landmark?: string;
  paymentMethod: "cod" | "transfer";
  price: number;
  websiteOrderId?: string;
  productId: string;
  variationId: string;
  bundleLabel: string;
}

async function call(action: string, payload?: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke("pancake-api", {
    body: { action, payload },
  });
  if (error) throw new Error(error.message || `Pancake ${action} failed`);
  return data;
}

function normalizeGeo(raw: any): GeoEntry[] {
  const list = raw?.data || raw?.provinces || raw?.districts || raw?.communes || raw || [];
  if (!Array.isArray(list)) return [];
  return list.map((e: any) => ({
    id: String(e.id ?? e.code ?? ""),
    name: e.name || e.name_en || "",
  })).filter(e => e.id && e.name);
}

export interface VariationEntry { variationId: string; productId: string }

/** Fetch variations and build SKU → {variationId, productId} map */
export async function fetchVariations(): Promise<Record<string, VariationEntry>> {
  const data = await call("getVariations");
  const list = data?.data || data?.variations || [];
  const map: Record<string, VariationEntry> = {};
  for (const v of list) {
    const sku = (v.display_id || v.sku || v.code || "").toString().trim();
    const variationId = (v.id || v.variation_id || "").toString();
    const productId = (v.product_id || v.product?.id || "").toString();
    if (sku && variationId && productId) map[sku] = { variationId, productId };
  }
  return map;
}

export async function fetchProvinces(): Promise<GeoEntry[]> {
  const data = await call("getProvinces");
  return normalizeGeo(data);
}

export async function fetchDistricts(provinceId: string): Promise<GeoEntry[]> {
  const data = await call("getDistricts", { provinceId });
  return normalizeGeo(data);
}

export async function fetchCommunes(districtId: string): Promise<GeoEntry[]> {
  const data = await call("getCommunes", { districtId });
  return normalizeGeo(data);
}

export async function submitOrder(orderData: OrderData) {
  const payload = {
    bill_full_name: orderData.fullName,
    bill_phone_number: orderData.phone,
    shipping_address: {
      address: orderData.streetAddress,
      province_id: orderData.provinceId,
      province_name: orderData.provinceName,
      district_id: orderData.districtId,
      district_name: orderData.districtName,
      commune_id: orderData.communeId,
      commune_name: orderData.communeName,
    },
    province_id: orderData.provinceId,
    district_id: orderData.districtId,
    commune_id: orderData.communeId,
    bill_province: orderData.provinceName,
    bill_district: orderData.districtName,
    bill_commune: orderData.communeName,
    note_print: orderData.landmark ? `Landmark: ${orderData.landmark}` : "",
    note_internal: [
      `Payment: ${orderData.paymentMethod === "cod" ? "Cash on Delivery (COD)" : "Bank Transfer / GCash"}`,
      `Amount: ₱${Number(orderData.price).toLocaleString()}`,
      `Website Order ID: ${orderData.websiteOrderId ?? "N/A"}`,
      `Product: ${orderData.productId} — ${orderData.bundleLabel}`,
    ].join("\n"),
    is_free_shipping: true,
    cod: orderData.paymentMethod === "cod" ? Number(orderData.price) : 0,
    cash: orderData.paymentMethod === "transfer" ? Number(orderData.price) : 0,
    items: [{
      product_id: orderData.productId,
      variation_id: orderData.variationId,
      quantity: 1,
      retail_price: Number(orderData.price),
    }],
  };

  const result = await call("createOrder", payload);
  if (!result?.success) {
    const msg = result?.data?.message || result?.data?.error || JSON.stringify(result?.data || {});
    throw new Error(`Pancake order failed: ${msg}`);
  }
  return result.data;
}