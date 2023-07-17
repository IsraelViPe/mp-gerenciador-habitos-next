"use client";
import Image from "next/image";
import { useState } from "react";
import showCorrectIcon from "../utils/showCorrectIcon";
import { day } from "../services/kv_db_endpoints";
import { updateHabit } from "../actions/actions";
import styles from "./calendartable.module.scss";

type habitProps = {
  name: string;
  days: day;
};

export default function CalendarTable({ name, days }: habitProps) {
  console.log(name);

  const [currDay, _setCurrDay] = useState(new Date());
  const [currMonth, setCurrMonth] = useState(currDay.getMonth());
  const [currYear, setCurrYear] = useState(currDay.getFullYear());

  const months = {
    0: "janeiro",
    1: "fevereiro",
    2: "março",
    3: "abril",
    4: "maio",
    5: "junho",
    6: "julho",
    7: "agosto",
    8: "setembro",
    9: "outubro",
    10: "novembro",
    11: "dezembro",
  };

  console.log(currDay.toLocaleDateString())
  const daysWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  let firstDayMonth = new Date(currYear, currMonth, 1);
  const blankDays =
    firstDayMonth.getDay() === 0
      ? []
      : Array(firstDayMonth.getDay()).fill("blank");

  const daysInCurrMonth = [...blankDays];

  while (firstDayMonth.getMonth() === currMonth) {
    daysInCurrMonth.push(firstDayMonth.toLocaleDateString());
    firstDayMonth.setDate(firstDayMonth.getDate() + 1);
  }

  const nextPreviousMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.id === "left") {
      if (currMonth === 0) {
        setCurrMonth(11);
        setCurrYear(currYear - 1);
      } else {
        setCurrMonth(currMonth - 1);
      }
    } else {
      if (currMonth === 11) {
        setCurrMonth(0);
        setCurrYear(currYear + 1);
      } else {
        setCurrMonth(currMonth + 1);
      }
    }
  };

  console.log(daysInCurrMonth);

  return (
    <div className={styles.container}>
      <div className={styles.header_selector}>
        <button id="left" type="button" onClick={(e) => nextPreviousMonth(e)}>
          <Image width={20} height={20} alt="left arrow" src={"/left.svg"} />
        </button>
        <span>{`${
          months[currMonth as keyof typeof months]
        } de ${currYear}`}</span>
        <button id="rigrh" type="button" onClick={(e) => nextPreviousMonth(e)}>
          <Image width={20} height={20} alt="right arrow" src={"/right.svg"} />
        </button>
      </div>

      <div className={styles.calendar_grid}>
        {daysWeek.map((day) => (
          <div className={styles.calendar_grid_header} key={day}>
            <span>{day}</span>
          </div>
        ))}
        {daysInCurrMonth.map((day) =>
          day === "blank" ? (
            <div className={styles.card_day} key={day}></div>
          ) : (
            <div className={styles.card_day} key={day}>
              <span>{parseInt(day.substring(0, 2), 10)}</span>
              <button
                onClick={() => updateHabit(name, day)}
                type="button"
              >
                <Image
                  src={showCorrectIcon(days, day)}
                  width={15}
                  height={15}
                  alt="icone"
                />
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
