import { Container, Text, Card, Box, Table, Space } from "@mantine/core";
import { withSessionSsr } from "lib/withSession";
import { InferGetServerSidePropsType } from "next";
import styles from "../styles/Home.module.css";

export default function Home({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Container>
      <Card>
        <Box>
          <Text fz="md">状态统计</Text>
        </Box>
      </Card>
      <Space h="xs" />
      <Card>
        <Table highlightOnHover withColumnBorders>
          <thead>
            <tr>
              <th>TaskID</th>
              <th>Status</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
        </Table>
      </Card>
    </Container>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    console.log('getServerSideProps',user);
    if (!user) {
      return {
        redirect: {
          destination: "/login",
        },
        props: { user: null },
      };
    }

    return {
      props: {
        user: req.session.user || null,
      },
    };
  }
);
