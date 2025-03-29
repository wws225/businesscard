import { Box, Button, Input, Link, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Top: FC = () => {
    const { register, handleSubmit ,formState} = useForm()
    const navigate = useNavigate()
    const submit = handleSubmit((data) => {
        navigate(`/cards/${data.id}`)
    })
    return (
        <>
            <VStack >
                <h1 data-testid="title">デジタル名刺アプリ</h1>
                <Box bg={"white"} px={"4"} py="4" rounded={"xl"}>
                    <form onSubmit={submit}>
                        <Box >ID</Box>
                        <Input data-testid="top-input" {...register("id", { required: "IDを入力してください" })} />
                        <p data-testid="top-errortext"> {formState.errors.id?.message as string}</p>
                        <Button data-testid="top-button" type="submit" marginTop={"2"} width={"full"} bg="green.600">名刺を見る</Button>
                    </form>
                </Box>
                <Link data-testid="top-register" href="/cards/register" >新規登録はこちら</Link>
            </VStack>
        </>
    )
}