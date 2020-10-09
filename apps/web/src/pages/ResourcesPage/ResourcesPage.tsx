import React from "react";

import { ErrorAlert } from "../../components/ErrorAlert";
import { useGetResourcesQuery } from "./GetRespurces.query.generated";
import { ResourceCard } from "./ResourceCard";

export const ResourcesPage: React.FunctionComponent = () => {
  const { loading, data, error } = useGetResourcesQuery();

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error || !data) {
    return <ErrorAlert message="Could not load resources..." />;
  }

  const { resources } = data;

  return (
    <div>
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
};
