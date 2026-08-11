"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
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
import type { ChartTile } from "@/lib/portfolio-cms";

const MODERN_CHART_PALETTE = ["#22c55e", "#f59e0b", "#14b8a6", "#64748b", "#84cc16", "#2dd4bf"];
const SINGLE_SERIES_BAR_COLOR = "#22c55e";
const GRID_STROKE = "#ece7e1";
const AXIS_STROKE = "#a1a1aa";
const SINGLE_SERIES_KEY = "__cms_value";

type TooltipPayload = {
  name?: string;
  value?: string | number;
  color?: string;
};

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

function chartColor(index: number) {
  return MODERN_CHART_PALETTE[index % MODERN_CHART_PALETTE.length];
}

function seriesColor(_series: NonNullable<ChartTile["series"]>[number] | undefined, index: number) {
  return chartColor(index);
}

function ModernTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white/95 px-4 py-3 shadow-[0_18px_50px_-32px_rgba(24,24,27,0.55)] backdrop-blur">
      {label && <p className="mb-2 text-xs font-black text-zinc-950">{label}</p>}
      <div className="space-y-1.5">
        {payload.map((item, i) => (
          <div key={`${item.name}-${i}`} className="flex min-w-36 items-center justify-between gap-5">
            {item.name && item.name !== SINGLE_SERIES_KEY && (
              <span className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color || chartColor(i) }}
                />
                {item.name}
              </span>
            )}
            <span className="text-sm font-black tabular-nums text-zinc-950">
              {typeof item.value === "number" ? formatChartValue(item.value) : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function legendFormatter(value: string) {
  return <span className="text-xs font-bold text-zinc-500">{value}</span>;
}

const axisTick = { fontSize: 11, fontWeight: 700, fill: AXIS_STROKE };
const chartMargin = { top: 8, right: 8, bottom: 8, left: -12 };
const horizontalChartMargin = { top: 8, right: 18, bottom: 4, left: 8 };

function formatChartValue(value: number) {
  return new Intl.NumberFormat("en", {
    maximumFractionDigits: value % 1 === 0 ? 0 : 1,
  }).format(value);
}

function buildAxisTicks(maxValue: number) {
  const safeMax = Math.max(maxValue, 1);
  const magnitude = 10 ** Math.floor(Math.log10(safeMax));
  const normalized = safeMax / magnitude;
  const roundedMax =
    normalized <= 2 ? 2 * magnitude : normalized <= 5 ? 5 * magnitude : 10 * magnitude;

  return Array.from({ length: 5 }, (_, i) => (roundedMax / 4) * i);
}

function SingleSeriesHorizontalBars({
  categories,
  series,
  showLegend,
}: {
  categories: string[];
  series: NonNullable<ChartTile["series"]>;
  showLegend: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const metric = series[0];
  const rows = categories
    .map((category, i) => ({
      category: category.trim(),
      value: Number(metric?.values[i]) || 0,
    }))
    .filter((row) => row.category);

  if (!rows.length) return null;

  const maxValue = Math.max(...rows.map((row) => row.value), 1);
  const ticks = buildAxisTicks(maxValue);
  const axisMax = ticks[ticks.length - 1] || maxValue;
  const color = SINGLE_SERIES_BAR_COLOR;
  const metricName = metric?.name?.trim();

  return (
    <div className="h-[280px] pt-2">
      <div className="grid h-[220px] grid-cols-[minmax(7rem,9.5rem)_1fr] gap-x-3 sm:grid-cols-[minmax(9rem,10.5rem)_1fr]">
        <div className="flex flex-col justify-between pb-7">
          {rows.map((row, i) => (
            <p
              key={`${row.category}-label-${i}`}
              className="truncate pr-1 text-xs font-semibold leading-none text-zinc-500"
              title={row.category}
            >
              {row.category}
            </p>
          ))}
        </div>
        <div className="relative pb-7">
          {ticks.map((tick) => (
            <div
              key={tick}
              className="absolute bottom-7 top-0 w-px bg-zinc-200"
              style={{ left: `${Math.min(100, (tick / axisMax) * 100)}%` }}
            />
          ))}
          <div className="relative flex h-full flex-col justify-between">
            {rows.map((row, i) => {
              const width = `${Math.max(0, Math.min(100, (row.value / axisMax) * 100))}%`;
              return (
                <div
                  key={`${row.category}-bar-${i}`}
                  className="group relative h-7"
                  title={`${row.category}: ${formatChartValue(row.value)}`}
                >
                  <motion.div
                    className="h-full origin-left rounded-r-md"
                    style={{ width, backgroundColor: color }}
                    initial={reduceMotion ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                  />
                  <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-lg bg-white px-2 py-1 text-[11px] font-black text-zinc-950 opacity-0 shadow-[0_12px_32px_-20px_rgba(24,24,27,0.75)] ring-1 ring-zinc-200 transition-opacity duration-200 group-hover:opacity-100">
                    {formatChartValue(row.value)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between">
            {ticks.map((tick) => (
              <span key={`${tick}-tick`} className="text-[11px] font-semibold tabular-nums text-zinc-400">
                {formatChartValue(tick)}
              </span>
            ))}
          </div>
        </div>
      </div>
      {showLegend && metricName && (
        <div className="mt-5 flex items-center justify-center gap-2 text-xs font-bold text-zinc-500">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
          {metricName}
        </div>
      )}
    </div>
  );
}

/**
 * Renders a ChartTile with Recharts, gated behind a one-time scroll-into-view
 * check so the mount animation plays when the visitor scrolls to it instead
 * of immediately on page load. Duplicates cms/components/ChartPreview.tsx's
 * rendering logic per this codebase's cross-app convention.
 */
export function ChartTileRender({ tile }: { tile: ChartTile }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const shouldRender = reduceMotion || isInView;

  return (
    <motion.div
      ref={ref}
      className="min-h-[320px]"
      initial={false}
      animate={shouldRender ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {shouldRender && <ChartBody tile={tile} />}
    </motion.div>
  );
}

function ChartBody({ tile }: { tile: ChartTile }) {
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
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={96}
            innerRadius={58}
            paddingAngle={3}
            cornerRadius={8}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={chartColor(i)} stroke="#ffffff" strokeWidth={3} />
            ))}
          </Pie>
          <Tooltip content={<ModernTooltip />} cursor={false} />
          {showLegend && (
            <Legend
              iconType="circle"
              formatter={legendFormatter}
              wrapperStyle={{ paddingTop: 12 }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    );
  }

  const rows = toRows(categories, series);
  const isHorizontalBar = tile.chartType === "bar" && tile.orientation === "horizontal";

  if (isHorizontalBar && series.length <= 1) {
    return <SingleSeriesHorizontalBars categories={categories} series={series} showLegend={showLegend} />;
  }

  if (tile.chartType === "line") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={rows} margin={chartMargin}>
          <CartesianGrid stroke={GRID_STROKE} strokeDasharray="0" vertical={false} />
          <XAxis
            dataKey="category"
            axisLine={false}
            tickLine={false}
            tick={axisTick}
            dy={10}
            label={tile.xAxisLabel ? { value: tile.xAxisLabel, position: "insideBottom", offset: -5 } : undefined}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={axisTick}
            label={tile.yAxisLabel ? { value: tile.yAxisLabel, angle: -90, position: "insideLeft" } : undefined}
          />
          <Tooltip content={<ModernTooltip />} cursor={{ stroke: "#d4d4d8", strokeWidth: 1 }} />
          {showLegend && (
            <Legend
              iconType="circle"
              formatter={legendFormatter}
              wrapperStyle={{ paddingTop: 14 }}
            />
          )}
          {series.map((s, i) => (
            <Line
              key={i}
              type="monotone"
              dataKey={s.name || `Series ${i + 1}`}
              stroke={seriesColor(s, i)}
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "#ffffff" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (tile.chartType === "area") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={rows} margin={chartMargin}>
          <CartesianGrid stroke={GRID_STROKE} strokeDasharray="0" vertical={false} />
          <XAxis
            dataKey="category"
            axisLine={false}
            tickLine={false}
            tick={axisTick}
            dy={10}
            label={tile.xAxisLabel ? { value: tile.xAxisLabel, position: "insideBottom", offset: -5 } : undefined}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={axisTick}
            label={tile.yAxisLabel ? { value: tile.yAxisLabel, angle: -90, position: "insideLeft" } : undefined}
          />
          <Tooltip content={<ModernTooltip />} cursor={{ stroke: "#d4d4d8", strokeWidth: 1 }} />
          {showLegend && (
            <Legend
              iconType="circle"
              formatter={legendFormatter}
              wrapperStyle={{ paddingTop: 14 }}
            />
          )}
          {series.map((s, i) => {
            const color = seriesColor(s, i);
            return (
              <Area
                key={i}
                type="monotone"
                dataKey={s.name || `Series ${i + 1}`}
                stroke={color}
                fill={color}
                fillOpacity={0.18}
                strokeWidth={3}
                animationDuration={1200}
                animationEasing="ease-out"
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
      <BarChart
        data={rows}
        layout={isHorizontalBar ? "vertical" : "horizontal"}
        margin={isHorizontalBar ? horizontalChartMargin : chartMargin}
        barCategoryGap={isHorizontalBar ? 18 : 20}
      >
        <CartesianGrid
          stroke={GRID_STROKE}
          strokeDasharray="0"
          vertical={isHorizontalBar}
          horizontal={!isHorizontalBar}
        />
        {isHorizontalBar ? (
          <>
            <XAxis
              type="number"
              axisLine={{ stroke: "#e4e4e7" }}
              tickLine={false}
              tick={{ ...axisTick, fill: "#71717a" }}
              tickFormatter={(value) => formatChartValue(Number(value))}
              label={tile.yAxisLabel ? { value: tile.yAxisLabel, position: "insideBottom", offset: -5 } : undefined}
            />
            <YAxis
              type="category"
              dataKey="category"
              width={154}
              axisLine={false}
              tickLine={false}
              tick={{ ...axisTick, fill: "#52525b" }}
              label={tile.xAxisLabel ? { value: tile.xAxisLabel, angle: -90, position: "insideLeft" } : undefined}
            />
          </>
        ) : (
          <>
            <XAxis
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={axisTick}
              dy={10}
              label={tile.xAxisLabel ? { value: tile.xAxisLabel, position: "insideBottom", offset: -5 } : undefined}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={axisTick}
              label={tile.yAxisLabel ? { value: tile.yAxisLabel, angle: -90, position: "insideLeft" } : undefined}
            />
          </>
        )}
        <Tooltip content={<ModernTooltip />} cursor={{ fill: "#f4f4f5" }} />
        {showLegend && (
          <Legend
            iconType="circle"
            formatter={legendFormatter}
            wrapperStyle={{ paddingTop: 14 }}
          />
        )}
        {series.map((s, i) => (
          <Bar
            key={i}
            dataKey={s.name || `Series ${i + 1}`}
            fill={seriesColor(s, i)}
            radius={isHorizontalBar ? [0, 6, 6, 0] : [10, 10, 0, 0]}
            barSize={isHorizontalBar ? 29 : 44}
            animationDuration={1300}
            animationEasing="ease-out"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
