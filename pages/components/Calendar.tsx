import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Button, Modal} from "@chakra-ui/react";

type Props = {
  isOpen:boolean
  onOpen:() => void
  onClose:() => void
}

function Calendar(Props:Props) {
  return (
    <>
      <Button onClick={Props.onOpen}>期間を指定</Button>
      <Modal isOpen={Props.isOpen} onClose={Props.onClose}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale="ja" // 日本語化
          events={[
            { title: "event 1", start: "2021-06-01" },
            // endに指定した日付は含まないので注意
            { title: "event 2", start: "2021-06-03", end: "2021-06-05" },
            {
              title: "event 3",
              start: "2023-02-T10:00:00", // 時間を指定するときはISO 8601の形式で。
            },
          ]}
        />
        <Button onClick={Props.onClose}>閉じる</Button>
      </Modal>
    </>
  );
};

export default Calendar