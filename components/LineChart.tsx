// components/LineChart.tsx
import React from "react";
import { View, Dimensions, StyleSheet, ViewStyle } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

type LineChartProps = {
  data: number[];
  width?: number;
  height?: number;
  maxValue?: number;
  lineColor?: string;
  lineWidth?: number;
  fillGradient?: boolean;
  fillColor?: string;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
};

export const LineChart: React.FC<LineChartProps> = ({
  data = [],
  width = Dimensions.get("window").width * 0.8,
  height = 300,
  maxValue = 100,
  lineColor = "black",
  lineWidth = 2,
  fillGradient = true,
  fillColor = "#000",
  style = {},
  containerStyle = {},
}) => {
  // Create SVG path for the line
  const createPath = (data: number[]) => {
    if (data.length === 0) return "";

    // Scale points to fit our box
    const xScale = width / Math.max(data.length - 1, 1);
    const yScale = height / maxValue;

    // Start path at the first point
    let path = `M 0,${height - (data[0] || 0) * yScale} `;

    // Add curves between each point
    for (let i = 1; i < data.length; i++) {
      const x = i * xScale;
      const y = height - data[i] * yScale;

      // Use cubic bezier curves for smooth line
      const prevX = (i - 1) * xScale;
      const prevY = height - data[i - 1] * yScale;

      const cp1x = prevX + xScale / 3;
      const cp1y = prevY;
      const cp2x = x - xScale / 3;
      const cp2y = y;

      path += `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y} `;
    }

    return path;
  };

  return (
    <View style={[styles.container, { width, height }, containerStyle]}>
      <Svg width={width} height={height} style={[styles.svg, style]}>
        {fillGradient && (
          <Defs>
            <LinearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={fillColor} stopOpacity=".5" />
              <Stop offset="1" stopColor={fillColor} stopOpacity="0" />
            </LinearGradient>
          </Defs>
        )}

        {/* Fill area under the line */}
        <Path
          d={`${createPath(data)} L ${width},${height} L 0,${height} Z`}
          fill={fillGradient ? "url(#lineGradient)" : fillColor}
          opacity={fillGradient ? 1 : 1}
        />

        {/* Line itself */}
        <Path
          d={createPath(data)}
          stroke={lineColor}
          strokeWidth={lineWidth}
          fill="none"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  svg: {
    position: "absolute",
  },
});
