import { useTranslation } from "@pancakeswap/localization";
import { format } from "date-fns";
import { createChart, IChartApi, LineStyle, UTCTimestamp } from "lightweight-charts";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "styled-components";
import LineChartLoader from "./LineChartLoaderSVG";

export enum PairDataTimeWindowEnum {
  DAY,
  WEEK,
  MONTH,
  YEAR,
}

export type SwapLineChartNewProps = {
  data: any[] | { time: Date; value: number }[];
  setHoverValue?: Dispatch<SetStateAction<number | undefined>>; // used for value on hover
  setHoverDate?: Dispatch<SetStateAction<string | undefined>>; // used for value label on hover
  isChangePositive: boolean;
  isChartExpanded: boolean;
  timeWindow: PairDataTimeWindowEnum;
  priceLineData?: { title: string; color: string; price: number }[];
} & React.HTMLAttributes<HTMLDivElement>;

const getChartColors = ({ isChangePositive }: { isChangePositive: boolean }) => {
  return isChangePositive
    ? { gradient1: "#00E7B0", gradient2: "#0C8B6C", stroke: "#31D0AA" }
    : { gradient1: "#ED4B9E", gradient2: "#ED4B9E", stroke: "#ED4B9E " };
};

const dateFormattingByTimewindow: Record<PairDataTimeWindowEnum, string> = {
  [PairDataTimeWindowEnum.DAY]: "h:mm a",
  [PairDataTimeWindowEnum.WEEK]: "MMM dd",
  [PairDataTimeWindowEnum.MONTH]: "MMM dd",
  [PairDataTimeWindowEnum.YEAR]: "MMM dd",
};

export const SwapLineChart: React.FC<SwapLineChartNewProps> = ({
  data,
  setHoverValue,
  setHoverDate,
  isChangePositive,
  isChartExpanded,
  timeWindow,
  priceLineData = [],
  ...rest
}) => {
  const { isDark } = useTheme();
  const transformedData = useMemo(() => {
    return (
      data?.map(({ time, value }) => {
        return { time: Math.floor(time.getTime() / 1000) as UTCTimestamp, value };
      }) || []
    );
  }, [data]);
  const {
    currentLanguage: { locale },
  } = useTranslation();
  const chartRef = useRef<HTMLDivElement>(null);
  const colors = useMemo(() => {
    return getChartColors({ isChangePositive });
  }, [isChangePositive]);
  const [chartCreated, setChart] = useState<IChartApi | undefined>();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartRef?.current?.clientWidth, height: chartRef?.current?.clientHeight });
    };

    const chart = createChart(chartRef?.current ?? "", {
      layout: {
        background: { color: "transparent" },
        textColor: isDark ? "F4EEFF" : "F4EEFF",
      },
      handleScale: false,
      handleScroll: false,
      width: (chartRef?.current?.parentElement?.clientWidth ?? 0) - 32,
      height: (chartRef?.current?.parentElement?.clientHeight ?? 0) - 32,
      rightPriceScale: {
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
        borderVisible: false,
      },
      timeScale: {
        visible: true,
        borderVisible: false,
        secondsVisible: false,
        tickMarkFormatter: (unixTime: number) => {
          return format(unixTime * 1000, dateFormattingByTimewindow[timeWindow]);
        },
      },
      grid: {
        horzLines: {
          visible: false,
        },
        vertLines: {
          visible: false,
        },
      },
      crosshair: {
        horzLine: {
          visible: true,
          labelVisible: true,
        },
        mode: 1,
        vertLine: {
          visible: true,
          labelVisible: false,
          style: 3,
          width: 1,
          color: isDark ? "#B8ADD2" : "#7A6EAA",
        },
      },
    });
    const newSeries = chart.addAreaSeries({
      lineWidth: 2,
      lineColor: colors.gradient1,
      topColor: colors.gradient1,
      bottomColor: isDark ? "#3c3742" : "white",
    });
    setChart(chart);
    newSeries.setData(transformedData);
    if (priceLineData.length > 0)
      priceLineData.forEach((d) => {
        newSeries.createPriceLine({
          price: d.price,
          color: d.color,
          lineWidth: 2,
          lineStyle: LineStyle.Dashed,
          axisLabelVisible: true,
          title: d.title,
        });
      });

    chart.timeScale().fitContent();

    chart.subscribeCrosshairMove((param) => {
      if (newSeries && param) {
        const timestamp = param.time as number;
        const now = new Date(timestamp * 1000);
        const time = `${now.toLocaleString(locale, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          timeZone: "UTC",
        })} (UTC)`;
        // @ts-ignore
        const parsed = (param.seriesData.get(newSeries)?.value ?? 0) as number | undefined;
        if (setHoverValue) setHoverValue(parsed);
        if (setHoverDate) setHoverDate(time);
      } else {
        if (setHoverValue) setHoverValue(undefined);
        if (setHoverDate) setHoverDate(undefined);
      }
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [
    transformedData,
    isDark,
    colors,
    isChartExpanded,
    locale,
    timeWindow,
    setHoverDate,
    setHoverValue,
    priceLineData,
  ]);

  return (
    <>
      {!chartCreated && <LineChartLoader />}
      <div ref={chartRef} style={{ minHeight: 200 }} id="swap-line-chart" {...rest} />
    </>
  );
};

export default SwapLineChart;
