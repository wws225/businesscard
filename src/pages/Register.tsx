import { BusinessCard } from "@/domain/businesscard";
import { InsertNewCard } from "@/supabase/InsertNewCard";
import { Box, Button, createListCollection,  Portal, Select, VStack } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";


const frameworks = createListCollection({
    items: [
        { label: "React", value: "React" },
        { label: "TypeScript", value: "TypeScript" },
        { label: "Github", value: "Github" },
    ],
})
export const Register: FC = () => {

    const { register, handleSubmit,formState:{errors} } = useForm<BusinessCard>()

    const [selected, setSelected] = useState("")

    const navigate = useNavigate()
    const onSubmit = handleSubmit((data: BusinessCard) => {
        const businesscard = new BusinessCard(data!.id, data!.name, data!.description, selected, data?.github_id, data?.qiita_id, data?.x_id)
        InsertNewCard({ businesscard })
        navigate("/")
    })

    return (
        <VStack bg={"white"} px={"4"} py={"4"}>
            <h1 data-testid="reg-title">名刺新規登録</h1>
            <form onSubmit={onSubmit}>
                <Box>
                    <p> 好きな英単語 </p>
                    <input data-testid="reg-id"
                        {...register('id', {
                            required: '英単語の入力は必須です'
                        })} />
                </Box>
                <p > {errors.id?.message }</p>
                <Box>
                    <p>*名前</p>
                    <input data-testid="reg-name"
                        {...register('name', {
                            required: '名前の入力は必須です'
                        })} />
                </Box>
                <p > {errors.name?.message as string}</p>
                <Box>
                    <p>*自己紹介</p>
                    <input data-testid="reg-description" {...register('description',{required:"自己紹介の入力は必須です"})} />
                </Box>
                <p > {errors.description?.message }</p>
                
                <Select.Root collection={frameworks} required={true} onValueChange={(e) => setSelected(e.value[0])}>
                    <Select.HiddenSelect data-testid="reg-select"/>
                    <Select.Label>*好きな技術</Select.Label>
                    <Select.Control >
                        <Select.Trigger bg="white">
                            <Select.ValueText data-testid="reg-skill" placeholder="selected skills" />
                        </Select.Trigger>
                        <Select.IndicatorGroup >
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal >
                        <Select.Positioner >
                            <Select.Content >
                                {frameworks.items.map((framework) => (
                                    <Select.Item item={framework} key={framework.value}>
                                        {framework.label}
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
                <Box>
                    <p> Github_ID</p>
                    <input data-testid="reg-githubId" {...register('github_id')} />
                </Box>
                <Box>
                    <p> Qiita_ID</p>
                    <input data-testid="reg-qiitaId" {...register('qiita_id')} />
                </Box>
                <Box>
                    <p> X_ID</p>
                    <input data-testid="reg-xId" {...register('x_id')} />
                </Box>
                <Button data-testid="reg-button" type="submit">登録</Button>
            </form>
        </VStack>
    )
}