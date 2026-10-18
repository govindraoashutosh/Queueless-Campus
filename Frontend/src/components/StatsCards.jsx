
import {
  Users,
  Clock3,
  Ticket,
  Activity,
  CheckCircle2,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

export default function StatsCards({
  totalWaiting = 0,
  activeTokens = 0,
  averageWait = 0,
  activeCounters = 0,
  serviceUptime = 0,
}) {
  const stats = [
    {
      id: "waiting",
      title: "People Waiting",
      value: totalWaiting,
      icon: Users,
      style: "blue",
      trend: "20%",
      trendType: "positive",
      trendIcon: ArrowDownRight,
    },
    {
      id: "wait",
      title: "Average Wait",
      value: `~${averageWait} min`,
      icon: Clock3,
      style: "blue",
      trend: "10%",
      trendType: "negative",
      trendIcon: ArrowUpRight,
    },
    {
      id: "tokens",
      title: "Active Token",
      value: activeTokens,
      icon: Ticket,
      style: "blue",
    },
    {
      id: "counters",
      title: "Active Counters",
      value: activeCounters,
      icon: Activity,
      style: "violet",
      dark: true,
      trend: "+2",
      trendType: "positive",
      trendIcon: ArrowUpRight,
    },
    {
      id: "uptime",
      title: "Service Uptime",
      value: `${serviceUptime}%`,
      icon: CheckCircle2,
      style: "teal",
      dark: true,
      online: true,
    },
  ];

  return (
    <section className="stats-grid" aria-label="Campus statistics">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trendIcon;

        return (
          <article
           className={`stat-card stat-${stat.id}`}
            key={stat.id}
          >
            <div className={`stat-icon ${stat.style}`}>
              <Icon size={24} />
            </div>

            <div className="stat-content">
              <strong>{stat.value}</strong>
              <span>{stat.title}</span>
            </div>

            {stat.trend && (
              <small className={`stat-trend ${stat.trendType}`}>
                <TrendIcon size={14} />
                {stat.trend}
              </small>
            )}

            {stat.online && (
              <small className="online-label">
                <span />
                Online
              </small>
            )}
          </article>
        );
      })}
    </section>
  );
}
