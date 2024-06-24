import { supabase } from "@/api/supabaseClient";

export async function fetchMessages(senderId: number, recipientId: number) {
  const { data, error } = await supabase
    .from("messages")
    .select("*,from:sender_id(id,name),to:recipient_id(id,name)")
    .or(
      `and(sender_id.eq.${recipientId},recipient_id.eq.${senderId}),` +
        `and(sender_id.eq.${senderId},recipient_id.eq.${recipientId})`
    )
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error);
  }

  return data;
}

//function to fetch all chats done by the user

function getLatestUniqueChats(messages: any[]) {
  const latestChats: { [key: string]: any } = {};

  messages.forEach((message: any) => {
    // Normalize the key so that (1, 2) is treated the same as (2, 1)
    const key = [message.sender_id, message.recipient_id]
      .sort((a, b) => a - b)
      .join("-");

    if (
      !latestChats[key] ||
      new Date(message.created_at) > new Date(latestChats[key].created_at)
    ) {
      latestChats[key] = message;
    }
  });

  return Object.values(latestChats);
}

export async function fetchChats(userId: number) {
  const { data, error } = await supabase
    .from("messages")
    .select("*,from:sender_id(id,name),to:recipient_id(id,name)")
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)

    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  return getLatestUniqueChats(data);
}

export async function sendMessage(
  senderId: number,
  recipientId: number,
  content: string
) {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ sender_id: senderId, recipient_id: recipientId, content }]);

  if (error) {
    console.error("Error sending message:", error);
  }

  return data;
}

//create a function to add user to the database
export async function addUser(user: any) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ name: user.nom + " " + user.prenom, email: user.email }])
    .select("id");

  if (error) {
    console.error("Error adding user:", error);
    }
    
    return data;
}
