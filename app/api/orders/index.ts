import { useAuth } from "@/app/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import { useQuery } from "react-query";

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
        .in("status", checkStatus);

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
    queryKey: ["order", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
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
