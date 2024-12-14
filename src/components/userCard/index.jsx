import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/slices/userSlice";
import { Card, Avatar, Typography, Row, Col, Button, Flex } from "antd";
const { Title, Text } = Typography;

export default function UserCard() {
  const { data, status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(fetchUser());
  }

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  if (status === "succeeded" && data) {
    const user = data.results[0];

    return (
      <Flex vertical align="center">
        <Card
          hoverable
          style={{
            width: 300,
            margin: "16px auto",
            background: "linear-gradient(135deg, #f0f0f0 0%, #d6e0f0 100%)",
            borderRadius: "12px",
          }}
          cover={
            <Avatar
              src={user.picture.medium}
              size={128}
              style={{ margin: "16px auto", display: "block" }}
            />
          }
        >
          <Title level={4}>
            {user.name.title} {user.name.first} {user.name.last}
          </Title>

          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Text strong>Location:</Text>
              <Text>
                {user.location.city}, {user.location.state},
                {user.location.country}
              </Text>
            </Col>

            <Col span={24}>
              <Text strong>Email:</Text>
              <Text>{user.email}</Text>
            </Col>

            <Col span={24}>
              <Text strong>Phone:</Text>
              <Text>{user.phone}</Text>
            </Col>

            <Col span={24}>
              <Text strong>Date of Birth:</Text>
              <Text>{user.dob.date}</Text>
            </Col>
          </Row>
        </Card>
        <Button type="primary" onClick={handleClick}>
          Spin
        </Button>
      </Flex>
    );
  }
  return null;
}
