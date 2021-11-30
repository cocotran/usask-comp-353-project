import Head from 'next/head';
import Link from 'next/link';
import { useState } from "react";

import { useUser } from "@auth0/nextjs-auth0";

export default function Client() {
    const { user, error, isLoading } = useUser();

    const [fatique, setFatique] = useState(false);
    const [anxiety, setAnxiety] = useState(false);
    const [irritable, setIrritable] = useState(false);
    const [unmotivated, setUnmotivated] = useState(false);
    const [sadness, setSadness] = useState(false);
    const [headache, setHeadache] = useState(false);
    const [crying, setCrying] = useState(false);
    const [bodyaches, setBodyaches] = useState(false);
    const [jounaling, setJounaling] = useState(false);
    const [mediation, setMediation] = useState(false);
    const [yoga, setYoga] = useState(false);

    const submitEntry = async () => {
        const res = await fetch(`https://ancient-cliffs-70972.herokuapp.com/api/tracker`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              entryDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
              clientID: 1,
              fatique: fatique ? "1" : "0",
              anxiety: anxiety ? "1" : "0",
              unmotivated: irritable ? "1" : "0",
              sadness: unmotivated ? "1" : "0",
              irritable: sadness ? "1" : "0",
              headache: headache ? "1" : "0",
              crying : crying ? "1" : "0",
              bodyaches : bodyaches ? "1" : "0",
              jounaling : jounaling ? "1" : "0",
              mediation : mediation ? "1" : "0",
              yoga : yoga ? "1" : "0"
          }),
        });
        const result = await res.json();
        if (result?.clientID == 1) {
            alert("Successfully added new entry");
            reset();
        }
      };

      const reset = () => {
        setFatique(false);
        setAnxiety(false);
        setIrritable(false);
        setUnmotivated(false)
        setSadness(false)
        setHeadache(false)
        setCrying(false)
        setBodyaches(false)
        setJounaling(false)
        setMediation(false)
        setYoga(false)
      }


    const symptoms = [
        {
            name: "fatique",
            checked: fatique,
            action: setFatique
        },
        {
            name: "anxiety",
            checked: anxiety,
            action: setAnxiety
        },
        {
            name: "irritable",
            checked: irritable,
            action: setIrritable
        },
        {
            name: "unmotivated",
            checked: unmotivated,
            action: setUnmotivated
        },
        {
            name: "sadness",
            checked: sadness,
            action: setSadness
        },
    ]

    const physical = [
        {
            name: "headache",
            checked: headache,
            action: setHeadache
        },
        {
            name: "crying",
            checked: crying,
            action: setCrying
        },
        {
            name: "bodyaches",
            checked: bodyaches,
            action: setBodyaches
        },
    ]

    const exercises = [
        {
            name: "jounaling",
            checked: jounaling,
            action: setJounaling
        },
        {
            name: "mediation",
            checked: mediation,
            action: setMediation
        },
        {
            name: "yoga",
            checked: yoga,
            action: setYoga
        }
    ]

    if (isLoading)
    return (
      <div className="auth-text">
        <p>Loading...</p>
      </div>
    );

    if (error)
        return (
        <div className="auth-text">
            <p>{error.message}</p>
        </div>
    );

    const symptomsCards = symptoms.map(item => {
        return (
            <div key={item.name} className="px-10 py-10 mx-5 rounded border border-gray-500 card">
                <label className="fastTap">
                    <p>{item.name}</p>
                    <div className="mt-3 flex justify-center pb-12">
                        <input type="checkbox" checked={item.checked} onChange={() => item.action(prevState => !prevState)} className="rounded text-pink-500 px-2 py-2"/>
                    </div>
                </label>
            </div>
        )
    })

    const physicalCards = physical.map(item => {
        return (
            <div key={item.name} className="px-10 py-10 mx-5 rounded border border-gray-500 card">
                <label className="fastTap">
                    <p>{item.name}</p>
                    <div className="mt-3 flex justify-center pb-12">
                        <input type="checkbox" checked={item.checked} onChange={() => item.action(prevState => !prevState)} className="rounded text-pink-500 px-2 py-2"/>
                    </div>
                </label>
            </div>
        )
    })

    const exercisesCards = exercises.map(item => {
        return (
            <div key={item.name} className="px-10 py-10 mx-5 rounded border border-gray-500 card">
                <label className="fastTap">
                    <p>{item.name}</p>
                    <div className="mt-3 flex justify-center pb-12">
                        <input type="checkbox" checked={item.checked} onChange={() => item.action(prevState => !prevState)} className="rounded text-pink-500 px-2 py-2"/>
                    </div>
                </label>
            </div>
        )
    })

  if (user) {
    return (
      <>
        <ul className="flex border-b">
            <li className="-mb-px mr-1">
                <Link href="/">
                    <a className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-pink-700 font-semibold">Home</a>
                </Link>
            </li>
            <li className="-mb-px mr-1">
                <a className="bg-white inline-block py-2 px-4 text-pink-500 hover:text-pink-800 font-semibold" href="#">Add new entries</a>
            </li>
            <li className="mr-1">
                <a className="bg-white inline-block py-2 px-4 text-pink-500 hover:text-pink-800 font-semibold" href="https://ancient-cliffs-70972.herokuapp.com/client/profile">My profile</a>
            </li>
        </ul>

        <h1 className="mt-10 text-3xl text-center">Daily Entry</h1>
        <p className="px-80 italic">Select cards to log</p>

        <div className="px-80 mt-3">
            <p className="font-medium text-lg">Mental symptoms</p>
            <div className="mt-3 flex justify- items-center">
                {symptomsCards}
            </div>

            <p className="mt-12 font-medium text-lg">Physical symptoms</p>
            <div className="mt-3 flex justify- items-center">
                {physicalCards}
            </div>

            <p className="mt-12 font-medium text-lg">Excercises</p>
            <div className="mt-3 flex justify- items-center">
                {exercisesCards}
            </div>
        </div>

        <div className="mt-12 mb-80 text-center">
            <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" onClick={submitEntry}>
                Submit new entry
            </button>
        </div>
      </>
    );
  }

  return (
    <div className="auth-text">
      <button className="w-40 px-5 py-3 text-4xl bg-black text-white rounded">
        <a href="/api/auth/login">Login</a>
      </button>
    </div>
  );
}
