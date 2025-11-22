export type QuoteApprovalSlot = {
  label: string;
  startAt: string;
};

export type QuoteApprovalPayload = {
  name: string;
  email: string;
  phone?: string;
  lang?: string;
  slotsText?: string;
  type?: string;
  notes?: string;
  hairstyleId?: string;
  serviceVariationId?: string;
  slot?: QuoteApprovalSlot;
  photoUrls?: string[];
};
