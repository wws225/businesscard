import { BusinessCard } from "@/domain/businesscard";
import { user_skill } from "@/domain/user_skill";
import { supabase } from "@/utils/supabase";

type Props = {
    businesscard: BusinessCard
}
export async function InsertNewCard(props: Props) {
    const { businesscard } = props
    try {
        const { error: error1 } = await supabase
            .from("businesscard")
            .insert([{
                id: businesscard.id, name: businesscard.name, description: businesscard.description,
                github_id: businesscard.github_id, qiita_id: businesscard.qiita_id, x_id: businesscard.x_id
            }])
            .select();

        const skillNUm = user_skill.GetSkillNumber(businesscard.skill)
        const { error: error2 } = await supabase
            .from("user_skill")
            .insert([{ user_id: businesscard.id, skill_id: skillNUm }])
            .select();

        if (error1 || error2) {
            console.error("データの挿入中にエラーが発生しました:", error1?.message || error2?.message);
            return false
        }
        return true
    }
    catch {
        console.error("予期しないエラーが発生しました:");
        return false
    }

}