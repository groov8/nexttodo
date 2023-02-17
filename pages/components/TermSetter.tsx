import FullCalendar from "@fullcalendar/react";
import { Button, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import interaction from "@fullcalendar/interaction";
import daygrid from "@fullcalendar/daygrid";
import { useState } from "react";

type Props = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  term: (date:string) => void
}

function TermSetter(Props: Props) {

  return (
    <>
      <Button onClick={Props.onOpen}>期間を指定</Button>
      <Modal isOpen={Props.isOpen} onClose={Boolean}>
        <ModalOverlay />
        <ModalContent>
          <FullCalendar
            plugins={[interaction, daygrid]}
            initialView="dayGridMonth"
            selectable={true}
            locale="ja"
            dateClick={function (info) {
              Props.term(info.dateStr);
            }}
          />
          <Button onClick={Props.onClose}>閉じる</Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TermSetter;