import Button from "@/components/ui/button";
import { useRouter } from "expo-router";

type ActionsProps = {
  id: number;
  trashed: boolean;
  toggleEditMode: () => void;
};

export default function Actions(props: ActionsProps) {
  const router = useRouter();

  return (
    <>
      {props.trashed ? null : (
        <>
          {/* <Button icon={"pencil"} onPress={props.toggleEditMode}>
            ပြင်ဆင်မည်
          </Button> */}
          <Button
            icon={"delete-variant"}
            variant="warning"
            onPress={() =>
              router.push({
                pathname: "/modals/invoice-confirm-modal",
                params: { id: props.id, action: "trash" },
              })
            }
          >
            အမှိုက်ပုံးသို့ ရွှေ့မည်
          </Button>
        </>
      )}

      <Button
        icon={"delete"}
        variant="error"
        onPress={() =>
          router.push({
            pathname: "/modals/invoice-confirm-modal",
            params: { id: props.id, action: "delete" },
          })
        }
      >
        လုံးဝ ဖျက်မည်
      </Button>
    </>
  );
}
