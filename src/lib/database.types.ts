export type Database = {
  public: {
    Tables: {
      merchants: {
        Row: {
          id: string;
          business_name: string;
          slug: string;
          google_review_url: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_name: string;
          slug: string;
          google_review_url: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_name?: string;
          slug?: string;
          google_review_url?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      scans: {
        Row: {
          id: string;
          merchant_id: string;
          created_at: string;
          user_agent: string | null;
          referer: string | null;
        };
        Insert: {
          id?: string;
          merchant_id: string;
          created_at?: string;
          user_agent?: string | null;
          referer?: string | null;
        };
        Update: {
          id?: string;
          merchant_id?: string;
          created_at?: string;
          user_agent?: string | null;
          referer?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "scans_merchant_id_fkey";
            columns: ["merchant_id"];
            isOneToOne: false;
            referencedRelation: "merchants";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Merchant = Database["public"]["Tables"]["merchants"]["Row"];

export type MerchantWithScanCount = Merchant & {
  total_scans: number;
};
