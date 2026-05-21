import Main from "@/components/layout/main";
import ThemeMode from "@/components/settings/theme-mode";
import TimePeriod from "@/components/settings/time-period";

export default function Settings() {
  return (
    <Main>
      <ThemeMode />
      <TimePeriod />
    </Main>
  );
}
