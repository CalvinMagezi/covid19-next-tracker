import React from "react";
import Statistic from "./Statistic";

function Stats({ stats }: { stats: any }) {
  return (
    <div className="flex flex-wrap items-center w-full my-5 justify-evenly">
      <Statistic
        title="New Cases"
        amount={stats?.todayCases}
        total={stats?.cases}
        caseType="cases"
      />
      <Statistic
        title="Recovered"
        amount={stats?.todayRecovered}
        total={stats?.recovered}
        caseType="recovered"
      />
      <Statistic
        title="Deaths"
        amount={stats?.todayDeaths}
        total={stats?.deaths}
        caseType="deaths"
      />
    </div>
  );
}

export default Stats;
