// This component needs date-formats function

import useTheme from "@/hooks/use-theme";
import { formatedDateTime } from "@/utils/date-formats";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { ReactElement, useCallback, useMemo, useState } from "react";
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

interface DateTimePickerProps {
  value: Date;
  onValueChange: (selectedDate: Date) => void;
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
  minimumDate?: Date;
  maximumDate?: Date;
  onDatePress?: (e: GestureResponderEvent) => void;
  onTimePress?: (e: GestureResponderEvent) => void;
  timeButtonStyle?: StyleProp<ViewStyle>;
  dateButtonStyle?: StyleProp<ViewStyle>;
  timeTextStyle?: StyleProp<TextStyle>;
  dateTextStyle?: StyleProp<TextStyle>;
  timeLabel?: string | number | ReactElement;
  dateLabel?: string | number | ReactElement;
}

export default function DateTimePicker({
  value,
  onValueChange,
  onDismiss,
  minimumDate,
  maximumDate,
  ...props
}: DateTimePickerProps) {
  const [showDate, setShowDate] = useState<boolean>(false);
  const [showTime, setShowTime] = useState<boolean>(false);

  const onChange = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (event.type === "dismissed") {
        onDismiss?.();
      } else if (event.type === "set") {
        if (!selectedDate) return;

        onValueChange(selectedDate);
      }
      setShowDate(false);
      setShowTime(false);
    },
    [onValueChange],
  );

  const onDatePress = useCallback(
    (e: GestureResponderEvent) => {
      setShowDate(true);
      props.onDatePress?.(e);
    },
    [props.onDatePress],
  );

  const onTimePress = useCallback(
    (e: GestureResponderEvent) => {
      setShowTime(true);
      props.onTimePress?.(e);
    },
    [props.onTimePress],
  );

  const { colors, roundness } = useTheme();

  const shareBtnStyle = useMemo(
    () => ({
      borderRadius: roundness * 10,
      borderColor: colors.primary,
      borderWidth: 1,
      padding: 8,
    }),
    [colors, roundness],
  );

  const defaultDateTime = useMemo(() => formatedDateTime(value), [value]);

  return (
    <>
      <View
        style={[{ flexDirection: "row", alignItems: "center" }, props.style]}
      >
        <TouchableRipple
          {...props}
          style={[
            {
              borderRightWidth: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              paddingLeft: 16,
            },
            shareBtnStyle,
            props.timeButtonStyle,
          ]}
          borderless
          rippleColor={colors.primaryContainer}
          onPress={onTimePress}
        >
          <View>
            {typeof props.timeLabel === "string" ||
            typeof props.timeLabel === "number" ||
            props.timeLabel === undefined ? (
              <Text style={[{ color: colors.primary }, props.timeTextStyle]}>
                {props.timeLabel || defaultDateTime.time}
              </Text>
            ) : (
              props.timeLabel
            )}
          </View>
        </TouchableRipple>
        <TouchableRipple
          style={[
            {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              paddingRight: 16,
            },
            shareBtnStyle,
            props.dateButtonStyle,
          ]}
          borderless
          rippleColor={colors.primaryContainer}
          onPress={onDatePress}
        >
          <View>
            {typeof props.dateLabel === "string" ||
            typeof props.dateLabel === "number" ||
            props.dateLabel === undefined ? (
              <Text style={[{ color: colors.primary }, props.dateTextStyle]}>
                {props.dateLabel || defaultDateTime.date}
              </Text>
            ) : (
              props.dateLabel
            )}
          </View>
        </TouchableRipple>
      </View>

      {showDate && (
        <RNDateTimePicker
          value={value}
          onChange={onChange}
          mode={"date"}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
      {showTime && (
        <RNDateTimePicker
          value={value}
          onChange={onChange}
          mode={"time"}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </>
  );
}
