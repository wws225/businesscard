import { supabase } from "../src/utils/supabase";

async function deleteUserData() {
  const startedYesterday = new Date();
  startedYesterday.setDate(startedYesterday.getDate() - 1);
  startedYesterday.setUTCHours(0, 0, 0, 0);

  const endedYesterday = new Date();
  endedYesterday.setDate(endedYesterday.getDate() - 1);
  endedYesterday.setUTCHours(23, 59, 59, 999);

  const userDeleteResult = await supabase
    .from("users")
    .delete()
    .gte("created_at", startedYesterday.toISOString())
    .lte("created_at", endedYesterday.toISOString());
  console.log("startedYesterday:", startedYesterday);
  console.log("endedYesterday:", endedYesterday);

  console.log("Deleted user data:", userDeleteResult);

  const skillDeleteResult = await supabase
    .from("user_skill")
    .delete()
    // 
    .gte("created_at", startedYesterday.toISOString())
    .lte("created_at", endedYesterday.toISOString());

  console.log("Deleted skill data:", skillDeleteResult);
}

deleteUserData()
  .then(() => console.log("Deletion complete!"))
  .catch((error) => console.error("Deletion failed:", error));

