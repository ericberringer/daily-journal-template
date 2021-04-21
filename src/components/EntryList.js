import React, { useContext, useEffect, useState } from "react";
import { EntryContext } from "./EntryProvider";
import { Entry } from "./Entry";
import { MoodContext } from "./mood/MoodProvider";
import "./Entries.css"

export const EntryList = () => {
  const { entries, getEntries, searchEntries } = useContext(EntryContext);
  const { moods, getMoods } = useContext(MoodContext);
  const [filteredEntries, setEntries] = useState([]);
  const [searchedTerm, setTerm] = useState("");
  const [moodSelected, setMoodSelected] = useState("");

  useEffect(() => {
    getEntries()
      .then(getMoods)
  }, []);

  useEffect(() => {
    setEntries(entries)
  }, [entries])

  useEffect(() => {
    if (searchedTerm !== "") {
        searchEntries(searchedTerm)
    }
  }, [searchedTerm])


  const filterAllEntries = (event) => {
    const filteredEntriesByMood = entries.filter(entry => entry.mood_id === parseInt(event.target.value))
    setEntries(filteredEntriesByMood)
    setMoodSelected(parseInt(event.target.value))
  }


  return (
    <section className="EntriesSection">
      <div className="filterEntriesSection">
        <h1>Filter Entries</h1>

        {
          moods.map(mood => {
            return <>
              <input type="radio" value={mood.id} name="moodId" checked={moodSelected === mood.id}
                onClick={filterAllEntries}
              /> {mood.mood}
            </>
          })
        }

        <div >
          <button className="button clearButton" onClick={() => {
            setEntries(entries)
            setMoodSelected("")
          }}>Clear Mood</button>
        </div>

        <div>
          <label htmlFor="searchFilter">Filter By Entry: </label>
          <input type="text" id="searchFilter" placeholder="Search" onKeyUp={
            (event) => {
              const searchTerm = event.target.value
              setTerm(searchTerm)
            }
          } />

        </div>
      </div>

        <h1>Entries</h1>

        {/*
              Pseudo Code
              .filter(happyEntries => happyEntries.mood.label === "Happy")
          */}

        <div className="entries">
          {entries.map(entry => {
            return <Entry key={entry.id} entry={entry} moods={moods} />;
          })}
        </div>
    </section>
  );
};
