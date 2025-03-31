import { BusinessCard } from "@/domain/businesscard";
import { InsertNewCard } from "@/supabase/InsertNewCard";
import { Box, Button, createListCollection, Field, Input, Portal, Select, Textarea, VStack, Text, Flex, IconButton } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {  FiArrowLeft, FiSave } from "react-icons/fi";

const frameworks = createListCollection({
    items: [
        { label: "React", value: "React" },
        { label: "TypeScript", value: "TypeScript" },
        { label: "Github", value: "Github" },
    ],
});

export const Register: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<BusinessCard>();
    const [selected, setSelected] = useState("");
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data: BusinessCard) => {
        const businesscard = new BusinessCard(
            data!.id, 
            data!.name, 
            data!.description, 
            selected, 
            data?.github_id, 
            data?.qiita_id, 
            data?.x_id
        );
        InsertNewCard({ businesscard });
        navigate("/");
    });

    return (
        <Box px={4} py={4} maxW="375px" mx="auto">
            <Flex mb={2} alignItems="center">
                <IconButton 
                    aria-label="戻る"
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate("/")}
                ><FiArrowLeft /></IconButton>
                <Text 
                    data-testid="reg-title" 
                    fontSize="xl" 
                    fontWeight="bold" 
                    textAlign="center"
                    color="green.700"
                    marginLeft={"8"}
                >
                    新規登録
                </Text>
            </Flex>

            <form onSubmit={onSubmit}>
                <VStack 
                    align="stretch" 
                    bg="white" 
                    px={4} 
                    py={4} 
                    rounded="lg"
                    shadow="sm"
                    borderWidth="1px"
                    borderColor="gray.100"
                >
                    {/* 必須項目 */}
                    <Field.Root invalid={!!errors.id}>
                        <Field.Label fontSize="sm" fontWeight="medium">
                            好きな英単語 <Box color="red">*</Box>
                        </Field.Label>
                        <Input 
                            placeholder="favorite English word" 
                            size="sm"
                            variant="outline"
                            bg="gray.50"
                            data-testid="reg-id" 
                            autoComplete="off"
                            {...register('id', { required: "英単語の入力は必須です" })}
                        />
                        <Field.ErrorText fontSize="xs" color="red.500">{errors.id?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.name}>
                        <Field.Label fontSize="sm" fontWeight="medium">
                            名前 <Box color="red">*</Box>
                        </Field.Label>
                        <Input 
                            placeholder="your name" 
                            size="sm"
                            variant="outline"
                            bg="gray.50"
                            data-testid="reg-name" 
                            autoComplete="off"
                            {...register('name', { required: "名前の入力は必須です" })}
                        />
                        <Field.ErrorText fontSize="xs" color="red.500">{errors.name?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.description}>
                        <Field.Label fontSize="sm" fontWeight="medium">
                            自己紹介 <Box color="red">*</Box>
                        </Field.Label>
                        <Textarea 
                            placeholder="introduce yourself"
                            size="sm"
                            bg="gray.50"
                            data-testid="reg-description"
                            minH="80px"
                            {...register('description', { required: "自己紹介の入力は必須です" })}
                        />
                        <Field.ErrorText fontSize="xs" color="red.500">{errors.description?.message}</Field.ErrorText>
                    </Field.Root>

                    <Box>
                        <Select.Root 
                            collection={frameworks} 
                            required={true} 
                            onValueChange={(e) => setSelected(e.value[0])}
                        >
                            <Select.HiddenSelect data-testid="reg-select" />
                            <Select.Label fontSize="sm" fontWeight="medium">
                                好きな技術 <Text as="span" color="red.500">*</Text>
                            </Select.Label>
                            <Select.Control>
                                <Select.Trigger 
                                    bg="gray.50" 
                                    py={1}
                                >
                                    <Select.ValueText data-testid="reg-skill" placeholder="技術を選択" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content bg="white" shadow="md" maxH="150px">
                                        {frameworks.items.map((framework) => (
                                            <Select.Item 
                                                item={framework} 
                                                key={framework.value}
                                                fontSize="sm"
                                            >
                                                {framework.label}
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    </Box>

                    <Field.Root>
                        <Field.Label fontSize="sm" fontWeight="medium">
                            Github_ID
                        </Field.Label>
                        <Input 
                            placeholder="Github Account" 
                            size="sm"
                            bg="gray.50"
                            data-testid="reg-githubId" 
                            autoComplete="off"
                            {...register('github_id')}
                        />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label fontSize="sm" fontWeight="medium">
                            Qiita_ID
                        </Field.Label>
                        <Input 
                            placeholder="Qiita Account" 
                            size="sm"
                            bg="gray.50"
                            data-testid="reg-qiitaId" 
                            autoComplete="off"
                            {...register('qiita_id')}
                        />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label fontSize="sm" fontWeight="medium">
                            X_ID
                        </Field.Label>
                        <Input 
                            placeholder="X Account" 
                            size="sm"
                            bg="gray.50"
                            data-testid="reg-xId" 
                            autoComplete="off"
                            {...register('x_id')}
                        />
                    </Field.Root>

                    <Button 
                        data-testid="reg-button"
                        type="submit"
                        bg="green.600"
                        color="white"
                        size="sm"
                        width="full"
                        mt={2}
                    >
                       <FiSave /> 登録する
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};