import FullCalendar from "@fullcalendar/react";
import { Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import interaction from "@fullcalendar/interaction";
import daygrid from "@fullcalendar/daygrid";
import { useState } from "react";
import { todo } from "../store/atom";
import { useRecoilState } from "recoil";
import { title } from "process";

type Props = {
  index: number
  isOpen: boolean
  onClose: () => void
  isEdit: boolean
}

function TermSetter(props: Props) {
  const [todoList, setTodoList] = useRecoilState(todo);
  const item = todoList[props.index];
  const setItem = () => {
    const newTodoList = [
      ...todoList.slice(0, props.index),
      {...item, titel: item.title, term: item.term},
      ...todoList.slice(props.index)
    ]
    setTodoList(newTodoList);
  }

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
                <Input value={item.title} onChange={(e) => { item.title = e.target.value }} />
              </> : <></>
            }
            <FullCalendar
              plugins={[interaction, daygrid]}
              initialView="dayGridMonth"
              selectable={true}
              locale="ja"
              dateClick={function (info) {
                item.term = info.dateStr;
              }}
            />
          </ModalBody>
          {props.isEdit ? <Button onClick={setItem}>変更</Button>:<Button>閉じる</Button>}
        </ModalContent>
      </Modal>
    </>)
};

export default TermSetter;