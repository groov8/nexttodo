import FullCalendar from "@fullcalendar/react";
import { Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import interaction from "@fullcalendar/interaction";
import daygrid from "@fullcalendar/daygrid";

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  setTitle: (title: string) => void
  setTerm: (term: string) => void
}

function TermSetter(Props: Props) {

  return (
    <>
      <Modal isOpen={Props.isOpen} onClose={Boolean} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>編集</ModalHeader>
          <ModalBody>
            <FormLabel>変更後のタイトル</FormLabel>
            <Input value={Props.title} onChange={(e) => Props.setTitle(e.target.value)}/>
            <FullCalendar
              plugins={[interaction, daygrid]}
              initialView="dayGridMonth"
              selectable={true}
              locale="ja"
              dateClick={function (info) {
                Props.setTerm(info.dateStr);
              }}
            />
          </ModalBody>
          <Button onClick={Props.onClose}>閉じる</Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TermSetter;