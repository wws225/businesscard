import { BusinessCard } from "@/domain/businesscard";
import { GetBusinessCard } from "@/supabase/GetBusinessCard";
import { Box, Button, Flex, Link, VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { SiQiita } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

export const Cards: FC = () => {
    const { subpath } = useParams<{ subpath: string }>();
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [businesscard, setBusinesscard] = useState<BusinessCard | null>(null);
    console.log(subpath)
    useEffect(() => {
        const getData = async () => {
            const data = await GetBusinessCard({ userId: subpath! })
            setBusinesscard(data)
            setLoading(false)
            console.log(`data:${data}`)
        }
        getData()
    }, [subpath])

    if (loading) return <p data-testid="load">loading・・・</p>

    return (
        < >
            {businesscard ?
                <VStack key={businesscard.id}
                    borderWidth={"1px"}
                    bg={"white"}
                    justify={"space-between"}
                    px={"4"}
                    py={"3"}
                    rounded={"xl"}
                    shadow={"md"}
                >
                    <Box  w={"full"} fontSize={"2xl"} fontWeight={"bold"} >
                        <p data-testid="cards-name">{businesscard.name}</p>
                        </Box>
                    <Box  w={"full"} fontWeight="semibold">自己紹介

                        <Box fontWeight={"normal"}>
                            <p data-testid="cards-description" dangerouslySetInnerHTML={{ __html: businesscard.description }} />
                        </Box>
                    </Box>
                    <Box  w={"full"} fontWeight="semibold">好きな技術
                        <Box fontWeight={"normal"}>
                            <p data-testid="cards-skill">{businesscard.skill}</p>
                        </Box>
                    </Box>
                    <Flex gap="10">
                        {businesscard.github_id && (
                            <Link
                                href={businesscard.github_id}
                                target="_blank"
                                rel="noopener noreferrer"
                                display="flex"
                                alignItems="center"
                                gap={1}
                            >
                                <FaGithub data-testid="cards-githubIcon" size={"1.5rem"} />
                            </Link>
                        )}
                        {businesscard.qiita_id && (
                            <Link
                                href={businesscard.qiita_id}
                                target="_blank"
                                rel="noopener noreferrer"
                                display="flex"
                                alignItems="center"
                                gap={1}
                            >
                                <SiQiita data-testid="cards-qiitaIcon" size={"1.5rem"} />
                            </Link>
                        )}
                        {businesscard.x_id && (
                            <Link
                                href={businesscard.x_id}
                                target="_blank"
                                rel="noopener noreferrer"
                                display="flex"
                                alignItems="center"
                                gap={1}
                            >
                                <FaXTwitter data-testid="cards-xIcon" size={"1.5rem"} />
                            </Link>
                        )}
                    </Flex>
                </VStack>
                : <p>データがありません</p>}
            <Button data-testid="button-back" margin={"6"} w={"full"} bg={"green.300"} onClick={()=>navigate("/") }>戻る</Button>
        </>
    );
};
