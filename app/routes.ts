import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("components/AppLayout.tsx", [
    index("routes/Dashboard.tsx"),
    route("tasks", "routes/Tasks.tsx"),
  ]),
] satisfies RouteConfig;
