import {
  Box,
  Card,
  Center,
  Container,
  Divider,
  Text,
  Title,
} from "@mantine/core";
import { IconPassword } from "@tabler/icons";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { TelegramUser } from "types/User";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const onLogin = useCallback(async (data: TelegramUser) => {
    const loginRes = await axios.post("/api/login", { user: data });
    // const loginRes = await fetch("/api/login", {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: { user: data },
    // });
    if (loginRes.data?.status === "success") {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    window.TelegramNameSpace = {
      onAuth: onLogin,
    };
  }, [onLogin]);

  useEffect(() => {
    const targetParent = document.getElementById("tg-login-button");
    if (targetParent) {
      if (targetParent.childNodes.length === 0) {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?21";
        script.dataset.telegramLogin = "taweret_bot";
        script.dataset.size = "large";
        script.dataset.onauth = "TelegramNameSpace.onAuth(user)";
        script.dataset.requestAccess = "write";
        targetParent.appendChild(script);
      }
    }
  }, []);

  return (
    <>
      <Container>
        <Card>
          <Box c="gray.6">
            <Center>
              <IconPassword size={48} />
            </Center>

            <Center>
              <Title order={1} c="gray.8">
                Taweret
              </Title>
            </Center>

            <Center>
              <Text>Hold infinity in the palm of your hand</Text>
            </Center>
          </Box>
          <Divider my="sm" variant="dotted" />
          <Box>
            <Center>
              <Text>请通过 Telegram 登录来验证您的订阅资格</Text>
            </Center>
          </Box>
          <Center mt="md">
            <div id="tg-login-button" />
          </Center>
        </Card>
      </Container>
    </>
  );
}
