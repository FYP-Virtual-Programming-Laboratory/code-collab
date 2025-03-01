import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectProject } from "../../features/global.slice";
import { GET_PROJECT_CONTRIBUTIONS } from "../../gql/queries";
import { ExplorerItem } from "./explorer-item";

export function Contributions() {
  const projectId = useAppSelector(selectProject)?.id ?? 0;
  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_PROJECT_CONTRIBUTIONS,
    {
      variables: { projectId },
    }
  );
  const totalContributions =
    data?.getProject?.contributions.contributionStats.reduce(
      (acc, stat) => acc + stat.contributions,
      0
    ) || 1;

  useEffect(() => {
    startPolling(60_000); // every 1 minute

    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  return (
    <ExplorerItem title="Contributions">
      <div className="p-2">
        {loading && <p className="text-center">Loading...</p>}
        {data && (
          <div className="flex flex-col gap-2">
            {data.getProject?.contributions.contributionStats.map((stat) => (
              <div key={stat.contributor} className="flex flex-col">
                <span className="font-bold">{stat.contributor}</span>
                <span className="text-xs font-semibold text-neutral-600">
                  {stat.contributions} changes ·{" "}
                  {Math.fround((stat.contributions / totalContributions) * 100)}
                  %
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </ExplorerItem>
  );
}
