import React from "react";
import { useParams } from "react-router-dom";

import { ErrorAlert } from "../../components/ErrorAlert";
import { UserAvatar } from "../../components/UserAvatar";
import { useGetUserQuery } from "./GetUser.query.generated";

export const UserDetailsPage: React.FunctionComponent = () => {
  const params = useParams();

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
    <div>
      <UserAvatar user={data.user} />
      <h3>{data.user.info}</h3>
    </div>
  );
};
