import { motion } from "framer-motion";
import { createChart, type IChartApi, type ISeriesApi, LineSeries, ColorType } from "lightweight-charts";
import { useEffect, useRef } from "react";
import type { HistoryPoint } from "@/types";

export function StockChart({ data }: { data: HistoryPoint[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Line"> | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#64748b",
      },
      grid: {
        vertLines: { color: "rgba(148, 163, 184, 0.12)" },
        horzLines: { color: "rgba(148, 163, 184, 0.12)" },
      },
      width: containerRef.current.clientWidth,
      height: 320,
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      crosshair: {
        vertLine: { color: "rgba(37, 99, 235, 0.35)" },
        horzLine: { color: "rgba(37, 99, 235, 0.35)" },
      },
    });

    const series = chart.addSeries(LineSeries, {
      color: "#2563eb",
      lineWidth: 3,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    series.setData(
      data.map((point, index) => ({
        time: `${index + 1}`,
        value: point.value,
      })),
    );
    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        chart.applyOptions({ width: entry.contentRect.width });
      }
    });

    resizeObserver.observe(containerRef.current);
    chartRef.current = chart;
    seriesRef.current = series;

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, []);

  useEffect(() => {
    seriesRef.current?.setData(
      data.map((point, index) => ({
        time: `${index + 1}`,
        value: point.value,
      })),
    );
    chartRef.current?.timeScale().fitContent();
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      ref={containerRef}
      className="h-[320px] w-full"
    />
  );
}
