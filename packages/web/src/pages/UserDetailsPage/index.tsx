import { Container, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";

import { ErrorAlert } from "../../components/ErrorAlert";
import { UserAvatar } from "../../components/UserAvatar";
import { useGetUserQuery } from "./queries.generated";

export const UserDetailsPage: React.FunctionComponent = () => {
  const params = useParams<{ id: string }>();

  const { loading, data, error } = useGetUserQuery({
    variables: { id: params.id }
  });

  if (loading) {
    return <span>Loading user...</span>;
  }

  if (error || !data) {
    return <ErrorAlert message="Count not load user!" />;
  }

  return (
    <Container>
      <UserAvatar user={data.user} />
      <Typography>{data.user.info}</Typography>
    </Container>
  );
};
