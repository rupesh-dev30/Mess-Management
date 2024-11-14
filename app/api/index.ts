import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const createProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { data: newProduct, error } = await supabase
        .from("products")
        .insert({
          name: data.name,
          price: data.price,
          image: data.image,
        })
        .single();

      if (error) {
        return new Error(error.message);
      }
      return data;
    },
    async onSuccess() {
      // refetch data after mutation
      await queryClient.invalidateQueries(["products"]);
    },
    onError(error) {
      console.error(error);
    }
  });
};
