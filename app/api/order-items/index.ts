import { useMutation } from "react-query";
import { InsertTables } from "@/types/types";
import { supabase } from "@/lib/supabase";

export const createOrderItems = () => {
  return useMutation({
    async mutationFn(items: InsertTables<"order_items">[]) {
      const { data: newOrderItems, error } = await supabase
        .from("order_items")
        .insert(items)
        .select();

      if (error) {
        return new Error(error.message);
      }
      return newOrderItems;
    },
  });
};
