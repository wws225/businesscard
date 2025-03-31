import { Box, Button, Field, Input, Link, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { FiSearch, FiUserPlus } from "react-icons/fi";

interface FormValues {
    id: string
}

export const Top: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
    const navigate = useNavigate()
    const submit = handleSubmit((data) => {
        console.log(errors)
        navigate(`/cards/${data.id}`)
    })
    
    return (
        <Box w="100%" maxW="500px" mx="auto" px={4}>
            <VStack spaceY={6} py={8}>
                <Text 
                    data-testid="title" 
                    fontSize="2xl" 
                    fontWeight="bold" 
                    color="green.700"
                    pb={2}
                >
                    デジタル名刺アプリ
                </Text>
                
                <form onSubmit={submit} style={{ width: '100%' }}>
                    <VStack 
                        bg="white" 
                        px={6} 
                        py={6} 
                        rounded="xl" 
                        spaceY={4}
                        shadow="md"
                        borderWidth="1px"
                        borderColor="gray.200"
                    >
                        <Field.Root invalid={!!errors.id} width="100%">
                            {/* <Field.Label fontWeight="medium">
                                名刺を見る <Field.RequiredIndicator />
                            </Field.Label> */}
                                <Input 
                                    data-testid="top-input"
                                    placeholder="カードIDを入力"
                                    variant="outline"
                                    bg="gray.50"
                                    _hover={{ bg: "gray.100" }}
                                    _focus={{ bg: "white", borderColor: "green.400" }}
                                    {...register("id", { required: "IDを入力してください" })}
                                />
                            <Field.ErrorText 
                                data-testid="top-errortext"
                                color="red.500"
                                fontWeight="medium"
                            >
                                {errors.id?.message}
                            </Field.ErrorText>
                        </Field.Root>
                        
                        <Button 
                            data-testid="top-button" 
                            type="submit" 
                            width="full" 
                            bg="green.600"
                            _hover={{ bg: "green.700" }}
                            _active={{ bg: "green.800" }}
                            color="white"
                            size="lg"
                            mt={2}
                        >
                            名刺を見る
                        </Button>
                    </VStack>
                </form>
                
                <Button
                    as={Link}
                    data-testid="top-register"
                    variant="outline"
                    colorScheme="green"
                    size="md"
                    _hover={{ textDecoration: "none", bg: "green.50" }}
                    onClick={()=> navigate(`/cards/register`)}
                >
                    新規登録はこちら
                </Button>
            </VStack>
        </Box>
    )
}
