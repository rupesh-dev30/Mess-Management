import { supabase } from "@/lib/supabase";
import { useQuery } from "react-query";

export const getProductsList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const gerProductById = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const {data, error} = await supabase.from('products').select('*').eq('id', id).single();

      if(error){
        throw new Error(error.message);
      }
      return data;
    },
  });
}


