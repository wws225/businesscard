
import { BusinessCard } from "@/domain/businesscard";
import { supabase } from "@/utils/supabase";

type Props = {
    userId: string
}

export async function GetBusinessCard(props: Props) {

    const { userId } = props
    const { data: businesscard, error: error1 } = await supabase.from("businesscard")
        .select("*")
        .eq("id", userId).single()
        console.log(businesscard)
    const { data: userSkill, error: error2 } = await supabase.from("user_skill")
        .select("*")
        .eq("user_id", userId).single();
        console.log(userId)
    const { data: skill, error: error3 } = await supabase.from("skills")
        .select("*")
        .eq("id", userSkill.skill_id).single();

    if (error1 || error2 || error3) {
        console.error(error1 || error2 ||error3)
        return null;
    }

    return BusinessCard.new(businesscard.id, businesscard.name, businesscard.description, skill.name, businesscard.github_id, businesscard.qiita_id, businesscard.x_id)
}
