import { useCallback, useState } from "react";

export default function useVisibility(): {
  visible: boolean;
  open: () => void;
  close: () => void;
} {
  const [visible, setVisible] = useState<boolean>(false);

  const open = useCallback(() => setVisible(true), []);

  const close = useCallback(() => setVisible(false), []);

  return { visible, open, close };
}
