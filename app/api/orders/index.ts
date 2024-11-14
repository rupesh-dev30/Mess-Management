import { useAuth } from "@/app/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { InsertTables, UpdateTables } from "@/types/types";

export const getAdminOrderList = ({ archived = false }) => {
  const checkStatus = archived
    ? ["Delivered"]
    : ["New", "Cooking", "Delivering"];

  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", checkStatus)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const getUserOrderList = () => {
  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ["orders", { userId: id }],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const getOrderById = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
      return data?.[0];
    },
  });
};

export const createOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: InsertTables<"orders">) {
      const { data: newOrder, error } = await supabase
        .from("orders")
        .insert({ ...data, user_id: userId })
        .select()
        .single();

      if (error) {
        return new Error(error.message);
      }
      return newOrder;
    },
    async onSuccess() {
      // refetch data after mutation
      await queryClient.invalidateQueries(["orders"]);
    },
    onError(error) {
      console.error(error);
    },
  });
};

export const updateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }: {
      id: number;
      updatedFields: UpdateTables<"orders">;
    }) {
      const { data: updatedOrder, error } = await supabase
        .from("orders")
        .update(updatedFields)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return new Error(error.message);
      }
      return updatedOrder;
    },
    async onSuccess(_, { id }) {
      // refetch data after mutation
      await queryClient.invalidateQueries(["orders"]);
      await queryClient.invalidateQueries(["orders", id]);
    },
    onError(error) {
      console.error(error);
    },
  });
};
