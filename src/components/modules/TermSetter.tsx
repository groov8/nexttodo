import FullCalendar from "@fullcalendar/react";
import { Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import interaction from "@fullcalendar/interaction";
import daygrid from "@fullcalendar/daygrid";
import { useState } from "react";

type Props = {
  isOpen: boolean
  onClose: () => void
  setTitle?: (title: string) => void
  setTerm: (term: string) => void
  isEdit: boolean
}

function TermSetter(props: Props) {
  const [title, setTitle] = useState("");

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={Boolean} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          {props.isEdit ? <ModalHeader>編集</ModalHeader> : <ModalHeader>作成</ModalHeader>}
          <ModalBody>
            {props.isEdit ?
              <>
                <FormLabel > 変更後のタイトル</FormLabel>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                <Button onClick={() => { props.setTitle?.(title) }}>変更</Button>
              </> : <></>
            }
            <FullCalendar
              plugins={[interaction, daygrid]}
              initialView="dayGridMonth"
              selectable={true}
              locale="ja"
              dateClick={function (info) {
                props.setTerm(info.dateStr);
              }}
            />
          </ModalBody>
          <Button onClick={props.onClose}>閉じる</Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TermSetter;