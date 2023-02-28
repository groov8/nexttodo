import FullCalendar from "@fullcalendar/react";
import { Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import interaction from "@fullcalendar/interaction";
import daygrid from "@fullcalendar/daygrid";
import { useState } from "react";

type Props = {
  isOpen: boolean
  onClose: () => void
  title?: string
  setTitle?: (title: string | undefined) => void
  term: string
  setTerm: (term: string) => void
  isEdit: boolean
}

function TermSetter(props: Props) {
  const [title, setTitle] = useState(props.title);
  const [term, setTerm] = useState(props.term);
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={Boolean} size={"xl"}>
        <ModalOverlay/>
        <ModalContent>
          {props.isEdit ? <ModalHeader>編集</ModalHeader> : <ModalHeader>作成</ModalHeader>}
          <ModalBody>
            {props.isEdit ?
              <>
                <FormLabel > 変更後のタイトル</FormLabel>
                <Input value={title} onChange={(e) => { setTitle(e.target.value) }} />
              </> : <></>
            }
            <FullCalendar
              plugins={[interaction, daygrid]}
              initialView="dayGridMonth"
              selectable={true}
              locale="ja"
              dateClick={function (info) {
                setTerm(info.dateStr);
              }}
            />
          </ModalBody>
          {props.isEdit ? <Button onClick={() => { props.setTitle?.(title), props.setTerm(term), props.onClose() }}>変更</Button> :
            <Button onClick={() => { props.onClose(), props.setTerm(term), setTerm("") }}>閉じる</Button>}
        </ModalContent>
      </Modal>
    </>)
};

export default TermSetter;