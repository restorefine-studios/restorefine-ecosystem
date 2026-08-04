"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DEFAULT_CHART_PALETTE, type ChartTile } from "@/lib/portfolio";

/** Turns parallel categories/series arrays into the row-per-category shape Recharts wants. */
function toRows(categories: string[], series: ChartTile["series"]) {
  return categories.map((category, i) => {
    const row: Record<string, string | number> = { category };
    (series ?? []).forEach((s, si) => {
      row[s.name || `Series ${si + 1}`] = Number(s.values[i]) || 0;
    });
    return row;
  });
}

/**
 * Renders a ChartTile with Recharts. Shared by the CMS live preview here and
 * duplicated, with a scroll-into-view gate added, in
 * restorefine-website/blocks/portfolio/chart-tile.tsx, per this codebase's
 * cross-app duplication convention.
 */
export function ChartPreview({ tile }: { tile: ChartTile }) {
  const categories = tile.categories ?? [];
  const series = tile.series ?? [];
  const showLegend = tile.showLegend ?? true;

  if (tile.chartType === "pie") {
    const data = categories.map((name, i) => ({
      name,
      value: Number(series[0]?.values[i]) || 0,
    }));
    return (
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} label>
            {data.map((_, i) => (
              <Cell key={i} fill={DEFAULT_CHART_PALETTE[i % DEFAULT_CHART_PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip />
          {showLegend && <Legend />}
        </PieChart>
      </ResponsiveContainer>
    );
  }

  const rows = toRows(categories, series);
  const isHorizontalBar = tile.chartType === "bar" && tile.orientation === "horizontal";

  if (tile.chartType === "line") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={rows}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 11 }}
            label={tile.xAxisLabel ? { value: tile.xAxisLabel, position: "insideBottom", offset: -5 } : undefined}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            label={tile.yAxisLabel ? { value: tile.yAxisLabel, angle: -90, position: "insideLeft" } : undefined}
          />
          <Tooltip />
          {showLegend && <Legend />}
          {series.map((s, i) => (
            <Line
              key={i}
              type="monotone"
              dataKey={s.name || `Series ${i + 1}`}
              stroke={s.color || DEFAULT_CHART_PALETTE[i % DEFAULT_CHART_PALETTE.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (tile.chartType === "area") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={rows}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 11 }}
            label={tile.xAxisLabel ? { value: tile.xAxisLabel, position: "insideBottom", offset: -5 } : undefined}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            label={tile.yAxisLabel ? { value: tile.yAxisLabel, angle: -90, position: "insideLeft" } : undefined}
          />
          <Tooltip />
          {showLegend && <Legend />}
          {series.map((s, i) => {
            const color = s.color || DEFAULT_CHART_PALETTE[i % DEFAULT_CHART_PALETTE.length];
            return (
              <Area
                key={i}
                type="monotone"
                dataKey={s.name || `Series ${i + 1}`}
                stroke={color}
                fill={color}
                fillOpacity={0.25}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // bar (default)
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={rows} layout={isHorizontalBar ? "vertical" : "horizontal"}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
        {isHorizontalBar ? (
          <>
            <XAxis
              type="number"
              tick={{ fontSize: 11 }}
              label={tile.yAxisLabel ? { value: tile.yAxisLabel, position: "insideBottom", offset: -5 } : undefined}
            />
            <YAxis
              type="category"
              dataKey="category"
              width={100}
              tick={{ fontSize: 11 }}
              label={tile.xAxisLabel ? { value: tile.xAxisLabel, angle: -90, position: "insideLeft" } : undefined}
            />
          </>
        ) : (
          <>
            <XAxis
              dataKey="category"
              tick={{ fontSize: 11 }}
              label={tile.xAxisLabel ? { value: tile.xAxisLabel, position: "insideBottom", offset: -5 } : undefined}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              label={tile.yAxisLabel ? { value: tile.yAxisLabel, angle: -90, position: "insideLeft" } : undefined}
            />
          </>
        )}
        <Tooltip />
        {showLegend && <Legend />}
        {series.map((s, i) => (
          <Bar
            key={i}
            dataKey={s.name || `Series ${i + 1}`}
            fill={s.color || DEFAULT_CHART_PALETTE[i % DEFAULT_CHART_PALETTE.length]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
