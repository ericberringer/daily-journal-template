import React, { useContext } from "react";
import { EntryContext } from "./EntryProvider";
import "./Entries.css"

export const Entry = ({ entry, moods }) => {
  // moods are embeded with each entry

  const { deleteEntry, getEntryById } = useContext(EntryContext)

  return (

    <section className="entry">
      <div className="entryDiv">
        <div className="entry__topic">{entry.topic}</div>
        <div className="entry__journal_entry">{entry.journal_entry}</div>
        <div className="entry__date">{entry.date}</div>
        <div className="entry__mood">{entry.mood?.mood}</div>

        <button className="button deleteButton" onClick={
          () => {
            deleteEntry(entry)
          }
        }>Delete</button>
        <button className="button editButton" onClick={
          () => {
            getEntryById(entry.id)
          }
        }>Edit</button>
      </div>
    </section>
  )
};
