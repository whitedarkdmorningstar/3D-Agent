import { useCallback, useState } from "react";
import { View } from "react-native";
import Alert from "../common/alert";
import Button from "../common/button";
import Modal from "../common/modal";
import Row from "../layout/row";

type ActionsProps = {
  toggleEditMode: () => void;
  moveToTrash: () => void;
  deleteForever: () => void;
};

export default function Actions(props: ActionsProps) {
  const [visibleDeleteWarning, setVisibleDeleteWarning] =
    useState<boolean>(false);

  const openDeleteWarning = useCallback(
    () => setVisibleDeleteWarning(true),
    [],
  );
  const closeDeleteWarning = useCallback(
    () => setVisibleDeleteWarning(false),
    [],
  );

  const [visibleTrashedWarning, setVisibleTrashedWarning] =
    useState<boolean>(false);

  const openTrashedWarning = useCallback(
    () => setVisibleTrashedWarning(true),
    [],
  );
  const closeTrashedWarning = useCallback(
    () => setVisibleTrashedWarning(false),
    [],
  );

  return (
    <>
      <Modal onDismiss={closeDeleteWarning} visible={visibleDeleteWarning}>
        <Alert
          title={"သတိ‌ပေးချက်!"}
          description="ယခုစာရင်းကို လုံးဝဖျက်မှာ သေချာပါသလား? ဤလုပ်ဆောင်ချက်ကို ပြန်လည်ပြင်ဆင်၍ မရပါ။"
        >
          <Row justifyContent="space-between">
            <Button
              variant="error"
              mode={"outlined"}
              onPress={closeDeleteWarning}
            >
              မလုပ်တော့ပါ
            </Button>
            <Button variant="error" onPress={props.deleteForever}>
              ဖျက်မည်
            </Button>
          </Row>
        </Alert>
      </Modal>

      <Modal onDismiss={closeTrashedWarning} visible={visibleTrashedWarning}>
        <Alert
          variant="warning"
          title={"သတိပေးချက်!"}
          description="ယခုစာရင်းကို အမှိုက်ပုံးသို့ ရွှေ့မည် သေချာပါသလား? လိုအပ်လျှင် အမှိုက်ပုံးမှ ပြန်လည်ရယူနိုင်ပါသည်။"
        >
          <Row justifyContent="space-between">
            <Button
              variant="warning"
              mode={"outlined"}
              onPress={closeTrashedWarning}
            >
              မလုပ်တော့ပါ
            </Button>
            <Button variant="warning" onPress={props.moveToTrash}>
              ရွေ့မည်
            </Button>
          </Row>
        </Alert>
      </Modal>

      <View style={{ gap: 16 }}>
        <Button icon={"pencil"} onPress={props.toggleEditMode}>
          ပြင်ဆင်မည်
        </Button>
        <Button
          icon={"delete-variant"}
          variant="warning"
          onPress={openTrashedWarning}
        >
          အမှိုက်ပုံးသို့ ရွှေ့မည်
        </Button>

        <Button icon={"delete"} variant="error" onPress={openDeleteWarning}>
          လုံးဝ ဖျက်မည်
        </Button>
      </View>
    </>
  );
}
