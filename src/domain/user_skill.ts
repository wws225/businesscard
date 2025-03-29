export class user_skill {
    constructor (
       public user_id :string,
       public skill_id:number
    ){}
public static new(
    user_id:string,
    skill_id:number
):user_skill{
    return  new user_skill(user_id,skill_id)
}
public static GetSkillNumber(value:string){
    switch(value){
        case "React" : return 1
        case "TypeScript" : return 2
        case "Github" : return 3
    }
}
}