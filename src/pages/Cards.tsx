import { BusinessCard } from "@/domain/businesscard";
import { GetBusinessCard } from "@/supabase/GetBusinessCard";
import { Box, Button, Flex, Link, VStack, Spinner, Text, HStack, Badge, IconButton } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { SiQiita } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FiArrowLeft } from "react-icons/fi";

export const Cards: FC = () => {
    const { subpath } = useParams<{ subpath: string }>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [businesscard, setBusinesscard] = useState<BusinessCard | null>(null);

    useEffect(() => {
        const getData = async () => {
            const data = await GetBusinessCard({ userId: subpath! });
            setBusinesscard(data);
            setLoading(false);
        }
        getData();
    }, [subpath]);

    if (loading) {
        return (
            <Flex
                h="100vh"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                gap={4}
            >
                <Spinner
                    color="green.500"
                    size="xl"
                    data-testid="load"
                />
                <Text color="gray.600">読み込み中...</Text>
            </Flex>
        );
    }

    return (
        <Box px={4} py={4} maxW="375px" mx="auto">
            <HStack mb={4} >
                <IconButton
                    aria-label="戻る"
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate("/")}
                    data-testid="button-back-icon"
                >
                    <FiArrowLeft />
                </IconButton>
                <Text color="green.700" fontWeight="bold">デジタル名刺</Text>
            </HStack>

            {businesscard ? (
                <VStack
                    key={businesscard.id}
                    borderWidth="1px"
                    borderColor="gray.200"
                    bg="white"
                    px={4}
                    py={4}
                    rounded="lg"
                    shadow="sm"
                    spaceY={3}
                    align="stretch"
                >
                    <Box w="full" textAlign="center" mb={1}>
                        <Text
                            fontSize="xl"
                            fontWeight="bold"
                            data-testid="cards-name"
                            color="gray.800"
                        >
                            {businesscard.name}
                        </Text>
                       
                    </Box>
                    <Box >
                        <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
                            好きな技術
                        </Text>
                        <Box
                            p={3}
                            bg="gray.50"
                            rounded="md"
                            fontSize="sm"
                        >
                           <Text
                            colorScheme="green"
                            rounded="md"
                        >
                            {businesscard.skill || "技術未設定"}
                        </Text>
                        </Box>
                    </Box>
                    <Box w="full" mt={2}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
                            自己紹介
                        </Text>
                        <Box
                            p={3}
                            bg="gray.50"
                            rounded="md"
                            fontSize="sm"
                            minH="80px"
                        >
                            <Text
                                data-testid="cards-description"
                                dangerouslySetInnerHTML={{ __html: businesscard.description }}
                            />
                        </Box>
                    </Box>

                    <Box w="full" mt={1}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
                            SNSリンク
                        </Text>
                        <Flex
                            justify="center"
                            gap={10}
                            bg="gray.50"
                            p={3}
                            rounded="md"
                        >
                            {businesscard.github_id && (
                                <Link
                                    href={businesscard.github_id}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    display="flex"
                                    alignItems="center"
                                    color="gray.700"
                                    _hover={{ color: "green.600" }}
                                >
                                    <FaGithub data-testid="cards-githubIcon" size="1.5rem" />
                                </Link>
                            )}
                            {businesscard.qiita_id && (
                                <Link
                                    href={businesscard.qiita_id}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    display="flex"
                                    alignItems="center"
                                    color="gray.700"
                                    _hover={{ color: "green.600" }}
                                >
                                    <SiQiita data-testid="cards-qiitaIcon" size="1.5rem" />
                                </Link>
                            )}
                            {businesscard.x_id && (
                                <Link
                                    href={businesscard.x_id}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    display="flex"
                                    alignItems="center"
                                    color="gray.700"
                                    _hover={{ color: "green.600" }}
                                >
                                    <FaXTwitter data-testid="cards-xIcon" size="1.5rem" />
                                </Link>
                            )}
                            {!businesscard.github_id && !businesscard.qiita_id && !businesscard.x_id && (
                                <Text fontSize="sm" color="gray.500">
                                    SNSリンクはありません
                                </Text>
                            )}
                        </Flex>
                    </Box>
                </VStack>
            ) : (
                <Box
                    textAlign="center"
                    p={6}
                    bg="white"
                    rounded="lg"
                    shadow="sm"
                    borderWidth="1px"
                    borderColor="gray.200"
                >
                    <Text fontWeight="medium" color="gray.600">
                        データがありません
                    </Text>
                </Box>
            )}

            <Button
                data-testid="button-back"
                mt={4}
                width="full"
                bg="green.600"
                color="white"
                _hover={{ bg: "green.700" }}
                size="md"
                onClick={() => navigate("/")}
            >
                トップに戻る
            </Button>
        </Box>
    );
};