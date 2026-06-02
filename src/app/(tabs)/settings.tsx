import ThemeMode from "@/components/settings/theme-mode";
import TimePeriod from "@/components/settings/time-period";
import UserInterface from "@/components/settings/user-interface";
import Divider from "@/components/ui/divider";
import Main from "@/components/ui/main";

export default function Screen() {
  return (
    <Main isScrollable>
      <ThemeMode />
      <Divider />
      <TimePeriod />
      <Divider />
      <UserInterface />
    </Main>
  );
}
